import { ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";

export function EmptyCart({ onClose }: { onClose?: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            {/* Icon with layered rings */}
            <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-muted opacity-30 scale-150" />
                <div className="absolute inset-0 rounded-full bg-muted opacity-20 scale-125" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                    <ShoppingCart
                        size={38}
                        className="text-muted-foreground opacity-60"
                        strokeWidth={1.5}
                    />
                </div>
            </div>

            {/* Text */}
            <h3 className="text-lg font-semibold tracking-tight mb-1">
                Your cart is empty
            </h3>
            <p className="text-sm text-muted-foreground max-w-[220px] leading-relaxed mb-8">
                Looks like you haven&apos;t added anything yet. Start shopping to fill it up!
            </p>

            {/* CTA */}
            <Link href="/" onClick={onClose}>
                <button className="bg-button-primary flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-95">
                    Browse Products
                    <ArrowRight size={16} />
                </button>
            </Link>
        </div>
    );
}
