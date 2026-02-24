import { CartItem } from "@/types";
import Image from "next/image";
import shoes8 from "@/assets/shoes/shoes8.png";

interface CartItemsProps {
  items: CartItem[];
}

const CartItems = ({ items }: CartItemsProps) => {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between rounded-xl border p-4">
          <div className="flex items-center space-x-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg">
              <Image src={shoes8} alt={item.name} width={64} height={64} />
            </div>
            <div>
              <h4 className="cart-dark-text font-semibold">{item.name}</h4>
            </div>
          </div>

          <div className="text-right">
            <div className="text-lg font-bold text-black">${item.price.toFixed(2)}</div>
            {item.originalPrice && (
              <div className="text-muted-foreground text-sm line-through">
                ${item.originalPrice.toFixed(2)}
              </div>
            )}
            {item.discount && (
              <div className="text-button-ternary rounded px-2 py-1 text-sm">
                Save ${item.discount}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
