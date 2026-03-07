"use client";

import { TAttribute } from "@/types";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { API_URL } from "@/redux/api/baseApi";

interface AttributeValueFilterProps {
    selectedValueIds: string[];
    onValueIdsChange: (valueIds: string[]) => void;
}

// Single Attribute Dropdown Component
interface SingleAttributeFilterProps {
    attribute: TAttribute;
    selectedValueIds: string[];
    onValueIdsChange: (valueIds: string[]) => void;
}

const SingleAttributeFilter = ({
    attribute,
    selectedValueIds,
    onValueIdsChange,
}: SingleAttributeFilterProps) => {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    // Get value IDs for this specific attribute
    const attributeValueIds = (attribute.values || []).map((v) => v.id);
    const selectedValuesForThisAttr = selectedValueIds.filter((id) =>
        attributeValueIds.includes(id)
    );

    // Filter values based on search term
    const filteredValues = (attribute.values || []).filter((v) =>
        v.value.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get selected items for display
    const selectedItems = (attribute.values || []).filter((v) =>
        selectedValueIds.includes(v.id)
    );

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

    const selectValue = (valueId: string) => {
        // Remove all other values from this attribute, then add the selected one
        const otherAttributeValues = selectedValueIds.filter((id) => !attributeValueIds.includes(id));
        onValueIdsChange([...otherAttributeValues, valueId]);
        setOpen(false); // Close dropdown after selection
    };

    const removeValue = (e: React.MouseEvent) => {
        e.stopPropagation();
        // Remove the value from this attribute
        onValueIdsChange(selectedValueIds.filter((id) => !attributeValueIds.includes(id)));
    };

    const clearSelection = () => {
        // Remove only values from this attribute
        onValueIdsChange(selectedValueIds.filter((id) => !attributeValueIds.includes(id)));
    };

    return (
        <div ref={containerRef} className="relative">
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setOpen((p) => !p)}
                className={[
                    "flex min-h-10 w-full items-center gap-2 px-3 py-2",
                    "bg-background rounded-md border text-left text-sm",
                    "focus-visible:ring-ring transition-colors focus:outline-none focus-visible:ring-2",
                    open ? "border-ring shadow-sm" : "border-input",
                    "hover:border-ring/70 cursor-pointer",
                    selectedValuesForThisAttr.length ? "border-primary bg-primary/5" : "",
                ].join(" ")}
            >
                {selectedItems.length > 0 ? (
                    // Show single selected item as plain text
                    <span className="flex items-center gap-2 flex-1">
                        {selectedItems[0].hexCode && (
                            <span
                                className="border-primary/30 inline-block h-3 w-3 shrink-0 rounded-full border"
                                style={{ backgroundColor: selectedItems[0].hexCode }}
                            />
                        )}
                        <span className="truncate">{selectedItems[0].value}</span>
                    </span>
                ) : (
                    <span className="text-muted-foreground flex-1">Select {attribute.name}</span>
                )}

                <ChevronDown
                    className={`text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""
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
                            <div className="text-muted-foreground py-8 text-center text-sm">
                                No results found
                            </div>
                        ) : (
                            <>
                                {filteredValues.map((val) => {
                                    const selected = selectedValueIds.includes(val.id);
                                    return (
                                        <button
                                            key={val.id}
                                            type="button"
                                            onClick={() => selectValue(val.id)}
                                            className={[
                                                "flex w-full items-center gap-2 px-3 py-2 text-left text-sm",
                                                "hover:bg-accent hover:text-accent-foreground transition-colors",
                                                selected ? "bg-primary/10 text-primary font-medium" : "",
                                            ].join(" ")}
                                        >
                                            <span className="flex items-center gap-2">
                                                {val.hexCode && (
                                                    <span
                                                        className="border-muted-foreground/30 inline-block h-3.5 w-3.5 shrink-0 rounded-full border"
                                                        style={{ backgroundColor: val.hexCode }}
                                                    />
                                                )}
                                                <span className="flex-1 truncate">{val.value}</span>
                                            </span>
                                            {selected && <Check className="ml-auto h-4 w-4 text-primary" />}
                                        </button>
                                    );
                                })}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// Main Component: Renders multiple attribute filters
export const AttributeValueFilter = ({
    selectedValueIds,
    onValueIdsChange,
}: AttributeValueFilterProps) => {
    const [attributes, setAttributes] = useState<TAttribute[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch attributes from server
    useEffect(() => {
        const fetchAttributes = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/attribute`);
                const data = await response.json();
                if (data.success && data.data) {
                    setAttributes(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch attributes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAttributes();
    }, []);

    if (loading) {
        return (
            <div className="text-muted-foreground text-sm py-2">Loading attributes...</div>
        );
    }

    if (attributes.length === 0) {
        return (
            <div className="text-muted-foreground text-sm py-2">No attributes available</div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {attributes.map((attribute) => (
                <SingleAttributeFilter
                    key={attribute.id}
                    attribute={attribute}
                    selectedValueIds={selectedValueIds}
                    onValueIdsChange={onValueIdsChange}
                />
            ))}
        </div>
    );
};
