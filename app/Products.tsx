"use client";
import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  images?: string[];        // Support multiple images
  description?: string;
}

const Products = ({ searchTerm, onAddToCart }: { 
  searchTerm: string; 
  onAddToCart: (product: any) => void 
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("saddamTechProducts");
    if (saved) {
      setProducts(JSON.parse(saved));
    }
  }, []);

  const filteredProducts = products
    .filter((p) => selectedCategory === "All" || p.category === selectedCategory)
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProduct?.images && selectedProduct.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images!.length);
    }
  };

  const prevImage = () => {
    if (selectedProduct?.images && selectedProduct.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProduct.images!.length) % selectedProduct.images!.length);
    }
  };

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
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="product-card bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden group hover:border-blue-400 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            onClick={() => openQuickView(product)}
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
                onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                className="mt-6 w-full bg-white text-black py-3.5 rounded-2xl font-semibold hover:bg-blue-500 hover:text-white transition-all active:scale-95 text-sm md:text-base"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
          <div className="bg-[#1e2937] max-w-4xl w-full rounded-3xl overflow-hidden">
            <div className="flex justify-end p-4">
              <button onClick={closeQuickView} className="text-3xl text-white/70 hover:text-white">✕</button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
              {/* Image Gallery */}
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-black">
                  <img
                    src={selectedProduct.images?.[currentImageIndex] || selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Image Navigation */}
                {(selectedProduct.images && selectedProduct.images.length > 1) && (
                  <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl">←</button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl">→</button>
                  </>
                )}

                {/* Thumbnails */}
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <div className="flex gap-3 mt-4 justify-center">
                    {selectedProduct.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt=""
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${index === currentImageIndex ? 'border-blue-500' : 'border-transparent'}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex flex-col">
                <div className="text-blue-400 text-sm mb-2">{selectedProduct.category}</div>
                <h2 className="text-3xl font-bold mb-4">{selectedProduct.name}</h2>
                <p className="text-4xl font-bold text-blue-400 mb-6">DA {selectedProduct.price}</p>

                {selectedProduct.description && (
                  <p className="text-gray-300 mb-8 leading-relaxed">{selectedProduct.description}</p>
                )}

                <button
                  onClick={() => onAddToCart(selectedProduct)}
                  className="mt-auto w-full bg-white text-black py-4 rounded-2xl font-semibold text-lg hover:bg-blue-500 hover:text-white transition-all"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;