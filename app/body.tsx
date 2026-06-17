"use client";
import { useState } from "react";
import Products from "./Products";
import About from "./about";
import CartModal from "./CartModal";
import CheckoutModal from "./CheckoutModal";

interface BodyProps {
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
}

const Body = ({
  cart,
  setCart,
  isCartOpen,
  setIsCartOpen,
  isCheckoutOpen,
  setIsCheckoutOpen,
  searchTerm,
}: BodyProps) => {

  // ================== CART FUNCTIONS ==================
  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOrderComplete = () => {
    setCart([]);
    setIsCheckoutOpen(false);
  };

  // ================== RETURN ==================
  return (
    <>
      {/* HERO */}
      <div id="home" className="px-6 md:px-20 pt-16 md:pt-24 pb-12 md:pb-20">
        <div className="max-w-3xl mx-auto text-center md:text-left">
          <h1 className="font-bold text-5xl md:text-7xl leading-tight tracking-tight">
            Saddam Tech.<br className="hidden md:block" />Delivered Fast.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-blue-200">
            Curated collection of the best gadgets, laptops, and accessories.
          </p>
          <a
            href="#shop"
            className="mt-8 inline-block bg-white text-black font-semibold px-8 py-4 rounded-2xl hover:bg-blue-400 hover:text-white transition text-lg w-full md:w-auto text-center"
          >
            Browse Collection →
          </a>
        </div>
      </div>

      {/* SHOP SECTION */}
      <div id="shop" className="px-4 md:px-12 pb-20">
        <Products searchTerm={searchTerm} onAddToCart={addToCart} />
      </div>

      <About />

      {/* Modals */}
      <CartModal
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderComplete={handleOrderComplete}
      />
    </>
  );
};

export default Body;