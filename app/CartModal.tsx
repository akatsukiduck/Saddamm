"use client";
import { X } from "lucide-react"; // Remove this line if you didn't install lucide-react

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartModalProps {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

const CartModal = ({ cart, isOpen, onClose, onUpdateQuantity, onRemove, onCheckout }: CartModalProps) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-white/20 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-3xl font-bold">Your Cart ({cart.length})</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl">
            ✕
          </button>
        </div>

        <div className="p-6 overflow-auto max-h-[55vh]">
          {cart.length === 0 ? (
            <p className="text-center text-xl py-16">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 py-4 border-b border-white/10 last:border-none">
                <img src={item.image} className="w-24 h-24 object-cover rounded-2xl" alt={item.name} />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-2xl font-bold mt-1">${item.price}</p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => onRemove(item.id)} className="text-red-400 hover:text-red-500 text-sm">Remove</button>
                  <div className="flex items-center gap-3 mt-4">
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 border border-white/30 rounded-lg hover:bg-white/10">-</button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 border border-white/30 rounded-lg hover:bg-white/10">+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-white/10">
            <div className="flex justify-between text-2xl font-bold mb-6">
              <span>Total</span>
              <span>${total}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-2xl text-lg font-semibold transition"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;