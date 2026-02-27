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
  /** Async function that fetches options. Return { data, hasMore } */
  fetchOptions: (params: {
    search: string;
    page: number;
    pageSize: number;
  }) => Promise<{ data: SelectOption[]; hasMore: boolean }>;

  /** Controlled value(s) */
  value?: SelectOption | SelectOption[] | null;
  onChange?: (value: SelectOption | SelectOption[] | null) => void;

  /** Allow selecting multiple items */
  multiSelect?: boolean;
  /** Show the search bar inside the dropdown */
  searchable?: boolean;

  pageSize?: number;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  error?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const CustomSelect = ({
  fetchOptions,
  value,
  onChange,
  multiSelect = false,
  searchable = true,
  pageSize = 20,
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

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Normalise value to array internally
  const selectedArray: SelectOption[] = value
    ? Array.isArray(value)
      ? value
      : [value]
    : [];

  // ── Fetch ──────────────────────────────────────────────────────────────────

  const load = useCallback(
    async (q: string, p: number, replace: boolean) => {
      if (p === 1) setLoading(true);
      else setLoadingMore(true);

      try {
        const res = await fetchOptions({ search: q, page: p, pageSize });
        setOptions((prev) => (replace ? res.data : [...prev, ...res.data]));
        setHasMore(res.hasMore);
        setPage(p);
      } catch {
        // silently ignore
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [fetchOptions, pageSize]
  );

  // Initial load when opened
  useEffect(() => {
    if (open) {
      load(search, 1, true);
      if (searchable) setTimeout(() => searchRef.current?.focus(), 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Debounced search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearch(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => load(q, 1, true), 350);
  };

  // ── Infinite scroll ────────────────────────────────────────────────────────

  const handleScroll = useCallback(() => {
    const el = listRef.current;
    if (!el || loadingMore || !hasMore) return;
    const scrolled = el.scrollTop / (el.scrollHeight - el.clientHeight);
    if (scrolled >= 0.9) {
      load(search, page + 1, false);
    }
  }, [loadingMore, hasMore, load, search, page]);

  // ── Selection logic ────────────────────────────────────────────────────────

  const isSelected = (opt: SelectOption) =>
    selectedArray.some((s) => s.value === opt.value);

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
    selectedArray.length === 0
      ? placeholder
      : !multiSelect
      ? selectedArray[0].label
      : null;

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={uid}
          className="block text-sm font-medium text-foreground mb-1.5"
        >
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
          "w-full min-h-10 px-3 py-2 flex items-center gap-2 flex-wrap",
          "rounded-md border bg-background text-left text-sm",
          "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          open ? "border-ring shadow-sm" : "border-input",
          disabled ? "opacity-50 cursor-not-allowed" : "hover:border-ring/70 cursor-pointer",
          error ? "border-destructive" : "",
        ].join(" ")}
      >
        {/* Multi-select chips */}
        {multiSelect &&
          selectedArray.map((s) => (
            <span
              key={s.value}
              className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded-full"
            >
              {s.label}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={(e) => removeSelected(s, e)}
              />
            </span>
          ))}

        {/* Single / empty placeholder */}
        {triggerLabel && (
          <span
            className={
              selectedArray.length === 0 ? "text-muted-foreground flex-1" : "flex-1"
            }
          >
            {triggerLabel}
          </span>
        )}

        {multiSelect && selectedArray.length > 0 && <span className="flex-1" />}

        {/* Clear all (single) */}
        {!multiSelect && selectedArray.length > 0 && (
          <X
            className="h-4 w-4 text-muted-foreground hover:text-destructive shrink-0"
            onClick={(e) => removeSelected(selectedArray[0], e)}
          />
        )}

        <ChevronDown
          className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Error */}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}

      {/* Dropdown */}
      {open && (
        <div
          className={[
            "absolute z-50 mt-1.5 w-full rounded-md border bg-popover shadow-lg",
            "animate-in fade-in-0 zoom-in-95 slide-in-from-top-1",
          ].join(" ")}
        >
          {/* Search bar */}
          {searchable && (
            <div className="flex items-center gap-2 px-3 py-2 border-b">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              {loading && (
                <Loader2 className="h-3.5 w-3.5 text-muted-foreground animate-spin" />
              )}
            </div>
          )}

          {/* Options list */}
          <div
            ref={listRef}
            onScroll={handleScroll}
            className="max-h-60 overflow-y-auto overscroll-contain"
          >
            {loading && options.length === 0 ? (
              <div className="flex items-center justify-center py-8 text-muted-foreground gap-2 text-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </div>
            ) : options.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No results found
              </div>
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
                        "w-full flex items-center gap-2 px-3 py-2 text-sm text-left",
                        "transition-colors hover:bg-accent hover:text-accent-foreground",
                        selected ? "bg-primary/8 text-primary font-medium" : "",
                      ].join(" ")}
                    >
                      {/* Checkbox-style tick for multi, dot for single */}
                      <span
                        className={[
                          "shrink-0 flex items-center justify-center rounded transition-colors",
                          multiSelect
                            ? "h-4 w-4 border rounded-sm"
                            : "h-4 w-4",
                          selected && multiSelect
                            ? "bg-primary border-primary text-primary-foreground"
                            : multiSelect
                            ? "border-input"
                            : "",
                        ].join(" ")}
                      >
                        {selected && multiSelect && (
                          <Check className="h-3 w-3" />
                        )}
                        {selected && !multiSelect && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </span>
                      <span className="flex-1 truncate">{opt.label}</span>
                    </button>
                  );
                })}

                {/* Loading more indicator */}
                {loadingMore && (
                  <div className="flex items-center justify-center py-3 text-muted-foreground gap-2 text-xs">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Loading more...
                  </div>
                )}

                {/* End of results */}
                {!hasMore && options.length > 0 && (
                  <div className="py-2 text-center text-xs text-muted-foreground/60">
                    — End of results —
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer: selected count for multi */}
          {multiSelect && selectedArray.length > 0 && (
            <div className="flex items-center justify-between px-3 py-2 border-t text-xs text-muted-foreground">
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