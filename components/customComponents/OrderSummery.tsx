import { CheckCircle, Lock } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { CartItem } from '@/types';

interface Totals {
  totalPrice: number;
  totalDiscount: number;
}

interface OrderSummaryProps {
  items: CartItem[];
  Totals: Totals;
  activeStep: 'items' | 'info' | 'payment';
  onProceed: () => void;
  isDisabled?: boolean;
}

const AllOrderSummery = ({ items, Totals, activeStep, onProceed, isDisabled = false }: OrderSummaryProps) => {
  const getButtonText = () => {
    switch (activeStep) {
      case 'items': return 'Proceed to Shipping';
      case 'info': return 'Continue to Payment';
      case 'payment': return 'Pay $' + Totals.totalPrice.toLocaleString('en-BD');
      default: return 'Continue';
    }
  };

  return (
    <div className="bg-card-primary rounded-xl shadow-lg">
      <div className="p-6 border-b">
        <h3 className="text-xl font-bold  flex items-center">
          <CheckCircle className="mr-2 text-button-ternary0" size={20} />
          Current Order
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          The sum of all total payments for goods here
        </p>
      </div>

      <div className="p-6">
        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-3 border-b">
              <div>
                <h4 className="font-medium ">{item.name}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-muted-foreground">Quantity: {item.quantity}</span>
                </div>
                <h1><span className='font-bold'>Price:</span> {item.finalPrice}</h1>
              </div>
            </div>
          ))}
        </div>

        {/* Order Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal ({items.length} items)</span>
            {/* <span>${summary.subtotal.toFixed(2)}</span> */}
          </div>

          <div className="flex justify-between text-danger">
            <span>Total Price</span>
            <span>${Totals.totalPrice.toLocaleString('en-BD')}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Total Discount</span>
            <span>${Totals.totalDiscount.toLocaleString('en-BD')}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Total</span>
            <span>${(Totals.totalPrice - Totals.totalDiscount).toLocaleString('en-BD')}</span>
          </div>
        </div>

        {/* Checkout Button */}


        {
          isDisabled ? <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                className={`w-full flex justify-center font-semibold py-3 px-4 rounded-lg mt-6
       bg-black/90 border-border shadow-sm cursor-not-allowed`}
              >
                <Lock className="mr-2" size={20} />
                {getButtonText()}
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Make Sure Complete to Fill This Form
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Please complete all required fields before proceeding to payment.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Okay</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
            : <button
              onClick={onProceed}
              disabled={isDisabled}
              className={`w-full flex justify-center font-semibold py-3 px-4 rounded-lg mt-6
    transition-all transform
    ${isDisabled
                  ? 'bg-muted-foreground '
                  : 'bg-black text-white hover:scale-[1.02] active:scale-[0.98]'
                }`}
            >
              <Lock className="mr-2" size={20} />
              {getButtonText()}
            </button>
        }

        {/* Security Note */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          By completing your purchase you agree to our Terms & Conditions
        </p>
      </div>
    </div>
  );
};

export default AllOrderSummery;