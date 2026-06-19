"use client";
import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const Products = ({ searchTerm, onAddToCart }: { 
  searchTerm: string; 
  onAddToCart: (product: any) => void 
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(3000);

  useEffect(() => {
    const saved = localStorage.getItem("saddamTechProducts");
    if (saved) {
      setProducts(JSON.parse(saved));
    }
  }, []);

  const filteredProducts = products
    .filter((p) => selectedCategory === "All" || p.category === selectedCategory)
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) => p.price <= priceRange);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <h1 className="text-4xl md:text-5xl font-bold">Our Collection</h1>

        <div className="flex flex-wrap gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white/10 border text-black border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400"
          >
            <option value="All">All Categories</option>
            {[...new Set(products.map(p => p.category))].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <div className="flex items-center gap-3">
            <span className="text-sm whitespace-nowrap">Up to DA {priceRange}</span>
            <input
              type="range"
              min="100"
              max="3000"
              step="50"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-40 accent-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden group hover:border-blue-400 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="p-5 md:p-6">
                <div className="text-xs md:text-sm text-blue-400 mb-1">{product.category}</div>
                <h2 className="text-lg md:text-2xl font-semibold mb-3 line-clamp-2">{product.name}</h2>
                <p className="text-2xl md:text-3xl font-bold">DA {product.price}</p>

                <button
                  onClick={() => onAddToCart(product)}
                  className="mt-6 w-full bg-white text-black py-3.5 rounded-2xl font-semibold hover:bg-blue-500 hover:text-white transition-all active:scale-95 text-sm md:text-base"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl col-span-full py-20">No products found 😔</p>
        )}
      </div>
    </div>
  );
};

export default Products;