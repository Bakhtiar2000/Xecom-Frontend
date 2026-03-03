"use client";

import { useState, useRef, useEffect, useCallback, useId } from "react";
import { Check, ChevronDown, X, Search, Loader2 } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SelectOption {
  value: string | number;
  label: string;
  /** Optional extra data you can attach */
  [key: string]: unknown;
}

export interface CustomSelectProps {
  /** API endpoint to fetch options from (e.g., "End of results/brands") */
  endpoint?: string;

  /** Custom async function that fetches options. Return { data, hasMore, meta } */
  fetchOptions?: (params: {
    searchTerm: string;
    pageNumber: number;
    pageSize: number;
    fields?: string[];
  }) => Promise<{ data: SelectOption[]; hasMore: boolean; meta?: any }>;

  /** Fields to request from the API (e.g., ["name", "id"]) */
  fields?: string[];

  /** Map response data to SelectOption format */
  mapToOption?: (item: any) => SelectOption;

  /** Controlled value(s) */
  value?: SelectOption | SelectOption[] | null;
  onChange?: (value: SelectOption | SelectOption[] | null) => void;

  /** Allow selecting multiple items */
  multiSelect?: boolean;
  /** Show the search bar inside the dropdown */
  searchable?: boolean;
  /** Enable infinite scrolling pagination */
  paginated?: boolean;

  placeholder?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  error?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const CustomSelect = ({
  endpoint,
  fetchOptions,
  fields,
  mapToOption,
  value,
  onChange,
  multiSelect = false,
  searchable = true,
  paginated = true,
  placeholder = "Select...",
  disabled = false,
  className = "",
  label,
  error,
}: CustomSelectProps) => {
  const uid = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadingRef = useRef(false);

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Normalise value to array internally
  const selectedArray: SelectOption[] = value ? (Array.isArray(value) ? value : [value]) : [];

  // ── Fetch ──────────────────────────────────────────────────────────────────

  const load = useCallback(
    async (q: string, p: number, replace: boolean) => {
      // Prevent duplicate calls
      if (loadingRef.current) return;

      loadingRef.current = true;
      if (p === 1) setLoading(true);
      else setLoadingMore(true);

      try {
        let res: { data: SelectOption[]; hasMore: boolean };

        if (fetchOptions) {
          // Use custom fetch function
          res = await fetchOptions({
            searchTerm: q,
            pageNumber: p,
            pageSize: 20,
            fields,
          });
        } else if (endpoint) {
          // Build query params for API endpoint
          const params = new URLSearchParams();
          if (paginated) {
            params.append("pageNumber", p.toString());
            params.append("pageSize", "20");
          }
          if (q) params.append("searchTerm", q);
          if (fields && fields.length > 0) {
            fields.forEach((field) => params.append("fields", field));
          }

          const url = `${endpoint}?${params.toString()}`;
          const response = await fetch(url);
          if (!response.ok) throw new Error("Failed to fetch options");

          const json = await response.json();

          // Map response data to SelectOption format
          const mappedData = mapToOption
            ? json.data.map(mapToOption)
            : json.data.map((item: any) => ({
              value: item.id,
              label: item.name || item.label,
              ...item,
            }));

          // Determine if there are more pages
          const hasMorePages = json.meta?.hasNextPage ??
            (json.meta?.pageNumber && json.meta?.totalPages
              ? json.meta.pageNumber < json.meta.totalPages
              : false);

          res = {
            data: mappedData,
            hasMore: paginated ? hasMorePages : false,
          };
        } else {
          throw new Error("Either endpoint or fetchOptions must be provided");
        }

        setOptions((prev) => (replace ? res.data : [...prev, ...res.data]));
        setHasMore(paginated && res.hasMore);
        setPageNumber(p);
      } catch (err) {
        console.error("Error fetching options:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
        loadingRef.current = false;
      }
    },
    [endpoint, fetchOptions, fields, mapToOption, paginated]
  );

  // Initial load when opened
  useEffect(() => {
    if (open) {
      load(searchTerm, 1, true);
      if (searchable) setTimeout(() => searchRef.current?.focus(), 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Debounced search (300ms)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchTerm(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => load(q, 1, true), 300);
  };

  // ── Infinite scroll ────────────────────────────────────────────────────────

  const handleScroll = useCallback(() => {
    if (!paginated || !listRef.current || loadingRef.current || !hasMore) return;

    const el = listRef.current;
    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight;
    const clientHeight = el.clientHeight;

    // Calculate how far from the bottom we are
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    // Trigger load when within 100px of the bottom (approximately 2-3 items)
    if (distanceFromBottom < 100) {
      load(searchTerm, pageNumber + 1, false);
    }
  }, [paginated, hasMore, load, searchTerm, pageNumber]);

  // ── Selection logic ────────────────────────────────────────────────────────

  const isSelected = (opt: SelectOption) => selectedArray.some((s) => s.value === opt.value);

  const toggleOption = (opt: SelectOption) => {
    if (!multiSelect) {
      onChange?.(isSelected(opt) ? null : opt);
      setOpen(false);
      return;
    }
    if (isSelected(opt)) {
      onChange?.(selectedArray.filter((s) => s.value !== opt.value));
    } else {
      onChange?.([...selectedArray, opt]);
    }
  };

  const removeSelected = (opt: SelectOption, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!multiSelect) {
      onChange?.(null);
      return;
    }
    onChange?.(selectedArray.filter((s) => s.value !== opt.value));
  };

  // ── Close on outside click ─────────────────────────────────────────────────

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────────

  const triggerLabel =
    selectedArray.length === 0 ? placeholder : !multiSelect ? selectedArray[0].label : null;

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Label */}
      {label && (
        <label htmlFor={uid} className="text-foreground mb-1.5 block text-sm font-medium">
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        id={uid}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((p) => !p)}
        className={[
          "flex min-h-10 min-w-40 w-full items-center gap-2 px-3 py-2",
          "bg-background rounded-md border text-left text-sm",
          "focus-visible:ring-ring transition-colors focus:outline-none focus-visible:ring-2",
          open ? "border-ring shadow-sm" : "border-input",
          disabled ? "cursor-not-allowed opacity-50" : "hover:border-ring/70 cursor-pointer",
          error ? "border-destructive" : "",
        ].join(" ")}
      >
        {/* Multi-select: show chips for few items, count for many */}
        {multiSelect && selectedArray.length > 0 ? (
          selectedArray.length <= 2 ? (
            // Show chips for 1-2 items
            <>
              {selectedArray.map((s) => (
                <span
                  key={s.value}
                  className="bg-batch text-batch-foreground inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                >
                  <span className="max-w-30 truncate">{s.label}</span>
                  <X
                    className="hover:text-destructive h-3 w-3 shrink-0 cursor-pointer"
                    onClick={(e) => removeSelected(s, e)}
                  />
                </span>
              ))}
              <span className="flex-1" />
            </>
          ) : (
            // Show count for 3+ items
            <span className="flex-1">
              {selectedArray.length} items selected
            </span>
          )
        ) : null}

        {/* Single / empty placeholder */}
        {triggerLabel && (
          <span className={selectedArray.length === 0 ? "text-muted-foreground flex-1" : "flex-1"}>
            {triggerLabel}
          </span>
        )}

        {/* Clear all (single) */}
        {!multiSelect && selectedArray.length > 0 && (
          <X
            className="text-muted-foreground hover:text-destructive h-4 w-4 shrink-0"
            onClick={(e) => removeSelected(selectedArray[0], e)}
          />
        )}

        <ChevronDown
          className={`text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""
            }`}
        />
      </button>

      {/* Error */}
      {error && <p className="text-destructive mt-1 text-xs">{error}</p>}

      {/* Dropdown */}
      {open && (
        <div
          className={[
            "bg-popover absolute z-50 mt-1.5 w-full rounded-md border shadow-lg",
            "animate-in fade-in-0 zoom-in-95 slide-in-from-top-1",
          ].join(" ")}
        >
          {/* Search bar */}
          {searchable && (
            <div className="flex items-center gap-2 border-b px-3 py-2">
              <Search className="text-muted-foreground h-4 w-4 shrink-0" />
              <input
                ref={searchRef}
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="placeholder:text-muted-foreground flex-1 bg-transparent text-sm outline-none"
              />
              {loading && <Loader2 className="text-muted-foreground h-3.5 w-3.5 animate-spin" />}
            </div>
          )}

          {/* Options list */}
          <div
            ref={listRef}
            onScroll={handleScroll}
            className="max-h-60 overflow-y-auto overscroll-contain"
          >
            {loading && options.length === 0 ? (
              <div className="text-muted-foreground flex items-center justify-center gap-2 py-8 text-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </div>
            ) : options.length === 0 ? (
              <div className="text-muted-foreground py-8 text-center text-sm">No results found</div>
            ) : (
              <>
                {options.map((opt) => {
                  const selected = isSelected(opt);
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => toggleOption(opt)}
                      className={[
                        "flex w-full items-center gap-2 px-3 py-2 text-left text-sm",
                        "hover:bg-accent hover:text-accent-foreground transition-colors",
                        selected ? "bg-primary/8 text-primary font-medium" : "",
                      ].join(" ")}
                    >
                      {/* Checkbox-style tick for multi, dot for single */}
                      <span
                        className={[
                          "flex shrink-0 items-center justify-center rounded transition-colors",
                          multiSelect ? "h-4 w-4 rounded-sm border" : "h-4 w-4",
                          selected && multiSelect
                            ? "bg-primary border-primary text-primary-foreground"
                            : multiSelect
                              ? "border-input"
                              : "",
                        ].join(" ")}
                      >
                        {selected && multiSelect && <Check className="h-3 w-3" />}
                        {selected && !multiSelect && <Check className="text-primary h-4 w-4" />}
                      </span>
                      <span className="flex-1 truncate">{opt.label}</span>
                    </button>
                  );
                })}

                {/* Loading more indicator */}
                {loadingMore && (
                  <div className="text-muted-foreground flex items-center justify-center gap-2 py-3 text-xs">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Loading more...
                  </div>
                )}

                {/* End of results */}
                {!hasMore && options.length > 0 && (
                  <div className="text-muted-foreground/60 py-2 text-center text-xs">
                    — End of results —
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer: selected count for multi */}
          {multiSelect && selectedArray.length > 0 && (
            <div className="text-muted-foreground flex items-center justify-between border-t px-3 py-2 text-xs">
              <span>{selectedArray.length} selected</span>
              <button
                type="button"
                onClick={() => onChange?.([])}
                className="hover:text-destructive transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
