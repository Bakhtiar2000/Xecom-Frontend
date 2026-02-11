
import { CartItem } from '@/types';
import Image from 'next/image';
import shoes8 from '@/assets/shoes/shoes8.png';

interface CartItemsProps {
  items: CartItem[];
}

const CartItems = ({ items }: CartItemsProps) => {
  return (
    <div className="space-y-4 ">
      {items.map((item) => (
        <div key={item.id} className="flex  items-center justify-between p-4 border rounded-xl">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center">
            <Image src={shoes8} alt={item.name} width={64} height={64} />
            </div>
            <div>
              <h4 className="font-semibold cart-dark-text">{item.name}</h4>
            </div>
          </div>
          
          <div className="text-right">
            <div className="font-bold text-lg text-black">
              ${item.price.toFixed(2)}
            </div>
            {item.originalPrice && (
              <div className="text-sm text-muted-foreground line-through">
                ${item.originalPrice.toFixed(2)}
              </div>
            )}
            {item.discount && (
              <div className="text-sm text-button-ternary px-2 py-1 rounded">
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