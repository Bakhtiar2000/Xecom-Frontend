"use client";

import { TAttribute } from "@/types";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface AttributeFilterProps {
  attribute: TAttribute;
  selectedValues: string[];
  onValuesChange: (values: string[]) => void;
}

export const AttributeFilter = ({
  attribute,
  selectedValues,
  onValuesChange,
}: AttributeFilterProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Filter values based on search term (client-side)
  const filteredValues = attribute.values.filter((v) =>
    v.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get selected items for display
  const selectedItems = attribute.values.filter((v) => selectedValues.includes(v.id));

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (open && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [open]);

  const toggleValue = (valueId: string) => {
    if (selectedValues.includes(valueId)) {
      onValuesChange(selectedValues.filter((id) => id !== valueId));
    } else {
      onValuesChange([...selectedValues, valueId]);
    }
  };

  const removeValue = (valueId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onValuesChange(selectedValues.filter((id) => id !== valueId));
  };

  const clearAll = () => {
    onValuesChange([]);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={[
          "flex min-h-10 min-w-40 items-center gap-2 px-3 py-2",
          "bg-background rounded-md border text-left text-sm",
          "focus-visible:ring-ring transition-colors focus:outline-none focus-visible:ring-2",
          open ? "border-ring shadow-sm" : "border-input",
          "hover:border-ring/70 cursor-pointer",
          selectedValues.length ? "border-primary bg-primary/5" : "",
        ].join(" ")}
      >
        {selectedItems.length > 0 ? (
          selectedItems.length <= 2 ? (
            // Show up to 2 items as chips
            <>
              {selectedItems.map((item) => (
                <span
                  key={item.id}
                  className="bg-batch text-batch-foreground inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                >
                  {item.hexCode && (
                    <span
                      className="border-primary/30 inline-block h-2.5 w-2.5 shrink-0 rounded-full border"
                      style={{ backgroundColor: item.hexCode }}
                    />
                  )}
                  <span className="max-w-20 truncate">{item.value}</span>
                  <X
                    className="hover:text-destructive h-3 w-3 shrink-0 cursor-pointer"
                    onClick={(e) => removeValue(item.id, e)}
                  />
                </span>
              ))}
              <span className="flex-1" />
            </>
          ) : (
            // Show count for 3+ items
            <span className="flex-1">{selectedItems.length} items selected</span>
          )
        ) : (
          <span className="text-muted-foreground flex-1">All {attribute.name}s</span>
        )}

        <ChevronDown
          className={`text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className={[
            "bg-popover absolute z-50 mt-1.5 w-full rounded-md border shadow-lg",
            "animate-in fade-in-0 zoom-in-95 slide-in-from-top-1",
          ].join(" ")}
        >
          {/* Search bar */}
          <div className="flex items-center gap-2 border-b px-3 py-2">
            <Search className="text-muted-foreground h-4 w-4 shrink-0" />
            <input
              ref={searchRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="placeholder:text-muted-foreground flex-1 bg-transparent text-sm outline-none"
            />
          </div>

          {/* Options list */}
          <div className="max-h-60 overflow-y-auto overscroll-contain">
            {filteredValues.length === 0 ? (
              <div className="text-muted-foreground py-8 text-center text-sm">No results found</div>
            ) : (
              <>
                {filteredValues.map((val) => {
                  const selected = selectedValues.includes(val.id);
                  return (
                    <button
                      key={val.id}
                      type="button"
                      onClick={() => toggleValue(val.id)}
                      className={[
                        "flex w-full items-center gap-2 px-3 py-2 text-left text-sm",
                        "hover:bg-accent hover:text-accent-foreground transition-colors",
                        selected ? "bg-primary/8 text-primary font-medium" : "",
                      ].join(" ")}
                    >
                      {/* Checkbox */}
                      <span
                        className={[
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition-colors",
                          selected
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-input",
                        ].join(" ")}
                      >
                        {selected && <Check className="h-3 w-3" />}
                      </span>
                      <span className="flex items-center gap-2">
                        {val.hexCode && (
                          <span
                            className="border-muted-foreground/30 inline-block h-3.5 w-3.5 shrink-0 rounded-full border"
                            style={{ backgroundColor: val.hexCode }}
                          />
                        )}
                        <span className="flex-1 truncate">{val.value}</span>
                      </span>
                    </button>
                  );
                })}
              </>
            )}
          </div>

          {/* Footer */}
          {selectedValues.length > 0 && (
            <div className="text-muted-foreground flex items-center justify-between border-t px-3 py-2 text-xs">
              <span>{selectedValues.length} selected</span>
              <button
                type="button"
                onClick={clearAll}
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
