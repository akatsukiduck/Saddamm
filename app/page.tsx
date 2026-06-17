"use client";
import { useState } from "react";
import Nav from "./Nav";
import Body from "./body";

const Page = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDark, setIsDark] = useState(true);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="bg-gradient-to-br from-[#16235C] to-[#2E49CD] text-white min-h-screen">
        <Nav
          cartCount={cartCount}
          onCartClick={() => setIsCartOpen(true)}
          toggleTheme={toggleTheme}
          isDark={isDark}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <Body
          cart={cart}
          setCart={setCart}
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
          isCheckoutOpen={isCheckoutOpen}
          setIsCheckoutOpen={setIsCheckoutOpen}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};

export default Page;