import { ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";

export function EmptyCart({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      {/* Icon with layered rings */}
      <div className="relative mb-6">
        <div className="bg-muted absolute inset-0 scale-150 rounded-full opacity-30" />
        <div className="bg-muted absolute inset-0 scale-125 rounded-full opacity-20" />
        <div className="bg-muted relative flex h-24 w-24 items-center justify-center rounded-full">
          <ShoppingCart size={38} className="text-muted-foreground opacity-60" strokeWidth={1.5} />
        </div>
      </div>

      {/* Text */}
      <h3 className="mb-1 text-lg font-semibold tracking-tight">Your cart is empty</h3>
      <p className="text-muted-foreground mb-8 max-w-[220px] text-sm leading-relaxed">
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
