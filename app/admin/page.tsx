"use client";
import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  images?: string[];
  description?: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

  const loadProducts = () => {
    const saved = localStorage.getItem("saddamTechProducts");
    if (saved) {
      setProducts(JSON.parse(saved));
    }
  };

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem("saddamTechProducts", JSON.stringify(newProducts));
  };

  const handleLogin = () => {
    setLoading(true);
    setError("");

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      loadProducts();
    } else {
      setError("Incorrect password");
    }
    setLoading(false);
  };

  const addProduct = () => {
    const name = prompt("Product Name:");
    if (!name) return;

    const priceStr = prompt("Price (DA):");
    if (!priceStr) return;
    const price = Number(priceStr);
    if (isNaN(price)) return;

    const category = prompt("Category:", "Laptops") || "Other";

    const mainImage = prompt("Main Image URL:", `https://picsum.photos/id/${Math.floor(Math.random() * 400)}/800/600`);
    if (!mainImage) return;

    const extraImagesStr = prompt(
      "Additional Images (comma separated URLs) - Optional:", 
      "https://picsum.photos/id/201/800/600, https://picsum.photos/id/202/800/600"
    );

    const images = extraImagesStr 
      ? extraImagesStr.split(",").map(url => url.trim()).filter(Boolean) 
      : [];

    const description = prompt("Short Description (Optional):", "");

    const newProduct: Product = {
      id: Date.now(),
      name,
      price,
      image: mainImage,
      category,
      images: images.length > 0 ? images : undefined,
      description: description || undefined,
    };

    saveProducts([...products, newProduct]);
    alert("✅ Product added successfully!");
  };

  const editProduct = (product: Product) => {
    const name = prompt("New Name:", product.name);
    if (name === null) return;

    const priceStr = prompt("New Price:", product.price.toString());
    if (priceStr === null) return;
    const price = Number(priceStr);
    if (isNaN(price)) return;

    const category = prompt("New Category:", product.category);
    if (category === null) return;

    const mainImage = prompt("Main Image URL:", product.image);
    if (mainImage === null) return;

    const extraImagesStr = prompt(
      "Additional Images (comma separated):", 
      product.images ? product.images.join(", ") : ""
    );

    const images = extraImagesStr 
      ? extraImagesStr.split(",").map(url => url.trim()).filter(Boolean) 
      : [];

    const description = prompt("Description:", product.description || "");

    const updated = products.map(p =>
      p.id === product.id 
        ? { 
            ...p, 
            name, 
            price, 
            category, 
            image: mainImage, 
            images: images.length > 0 ? images : undefined,
            description: description || undefined 
          } 
        : p
    );

    saveProducts(updated);
  };

  const deleteProduct = (id: number) => {
    if (confirm("Delete this product permanently?")) {
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
          <div className="flex gap-4">
            <button
              onClick={addProduct}
              className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-2xl text-lg font-medium"
            >
              + Add New Product
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-6 py-4 bg-red-600 hover:bg-red-700 rounded-2xl"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden p-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-52 object-cover rounded-2xl mb-4"
              />
              <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
              <p className="text-blue-400 mb-1">{product.category}</p>
              <p className="text-2xl font-bold mb-6">DA {product.price}</p>

              {product.images && product.images.length > 0 && (
                <p className="text-xs text-green-400 mb-4">+ {product.images.length} more images</p>
              )}

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