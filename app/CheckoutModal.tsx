"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: any[];
  onOrderComplete: () => void;
}

const CheckoutModal = ({ isOpen, onClose, cart, onOrderComplete }: CheckoutModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Better formatted items for email
    const orderItems = cart
      .map(item => `• ${item.quantity}x ${item.name} - $${item.price}`)
      .join("\n");

    try {
      await emailjs.send(
        "service_r4bdmkm",           // ← Replace
        "template_rw14kxp",          // ← Replace
        {
          order_id: "TF-" + Date.now().toString().slice(-6),
          date: new Date().toLocaleString(),
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          address: formData.address,
          items: orderItems,
          total: total,
        },
        "snBM326uazR8onfGJ"            // ← Replace
      );

      alert(`✅ Order placed successfully!`);
      onOrderComplete();
      onClose();
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Failed to send order. Please check console.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-white/20 rounded-3xl w-full max-w-lg">
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold">Checkout</h2>
          <button onClick={onClose} className="text-2xl text-gray-400 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Phone</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3"
              placeholder="+212 612345678"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Delivery Address</label>
            <textarea
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 h-24"
              placeholder="Your full address"
            />
          </div>

          <div className="pt-4 border-t border-white/10">
            <div className="flex justify-between text-xl font-bold mb-6">
              <span>Total</span>
              <span>${total}</span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-2xl text-lg font-semibold disabled:opacity-70"
            >
              {loading ? "Sending Order..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;