"use client";
import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Login
  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (res.ok) {
      setIsAuthenticated(true);
      loadProducts();
    } else {
      setError(data.error || "Incorrect password");
    }
    setLoading(false);
  };

  // Load products
  const loadProducts = async () => {
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data);
  };

  // Save products
  const saveProducts = async (newProducts: Product[]) => {
    setProducts(newProducts);
    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProducts),
    });
  };

  const addProduct = () => {
    const name = prompt("Product Name:");
    if (!name) return;
    const price = Number(prompt("Price (DA):"));
    if (!price) return;
    const category = prompt("Category:", "Laptops") || "Other";
    const image = prompt("Image URL:", `https://picsum.photos/id/${Math.floor(Math.random() * 400)}/600/400`);

    const newProduct: Product = {
      id: Date.now(),
      name,
      price,
      image,
      category,
    };

    saveProducts([...products, newProduct]);
  };

  const editProduct = (product: Product) => {
    const name = prompt("New Name:", product.name);
    if (name === null) return;
    const price = Number(prompt("New Price:", product.price));
    const category = prompt("New Category:", product.category);
    const image = prompt("New Image URL:", product.image);

    const updated = products.map(p =>
      p.id === product.id ? { ...p, name, price, category, image } : p
    );
    saveProducts(updated);
  };

  const deleteProduct = (id: number) => {
    if (confirm("Delete this product?")) {
      saveProducts(products.filter(p => p.id !== id));
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white px-4">
        <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20 w-full max-w-md">
          <h1 className="text-3xl font-bold mb-8 text-center">Admin Login</h1>
          
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 bg-white/10 border border-white/30 rounded-2xl mb-4 focus:outline-none focus:border-blue-500"
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-2xl font-semibold disabled:opacity-50"
          >
            {loading ? "Checking..." : "Login"}
          </button>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Admin Dashboard - Saddam Tech</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-2xl"
          >
            Logout
          </button>
        </div>

        <button
          onClick={addProduct}
          className="mb-8 bg-green-600 hover:bg-green-700 px-8 py-4 rounded-2xl text-lg font-medium flex items-center gap-3"
        >
          + Add New Product
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden p-5">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-52 object-cover rounded-2xl mb-4"
              />
              <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
              <p className="text-blue-400 mb-1">{product.category}</p>
              <p className="text-2xl font-bold mb-6">DA {product.price}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => editProduct(product)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-2xl"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-2xl"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-center text-xl py-20">No products yet. Add some!</p>
        )}
      </div>
    </div>
  );
}