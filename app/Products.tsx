"use client";
import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  images?: string[];        // Multiple images
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

  // Get all images (support both old single image and new multiple images)
  const getAllImages = (product: Product) => {
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    return [product.image];
  };

  const currentImages = selectedProduct ? getAllImages(selectedProduct) : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
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
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4">
          <div className="bg-[#1e2937] max-w-5xl w-full rounded-3xl overflow-hidden">
            <div className="flex justify-end p-4 border-b border-white/10">
              <button 
                onClick={closeQuickView} 
                className="text-4xl text-white/70 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Images Section */}
              <div>
                <div className="aspect-square rounded-2xl overflow-hidden bg-black mb-4">
                  <img
                    src={currentImages[currentImageIndex]}
                    alt={selectedProduct.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Navigation Arrows */}
                {currentImages.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-12 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white w-12 h-12 rounded-full flex items-center justify-center text-3xl"
                    >
                      ←
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-12 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white w-12 h-12 rounded-full flex items-center justify-center text-3xl"
                    >
                      →
                    </button>
                  </>
                )}

                {/* Thumbnails */}
                {currentImages.length > 1 && (
                  <div className="flex gap-3 justify-center mt-6 flex-wrap">
                    {currentImages.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt=""
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition-all ${index === currentImageIndex ? 'border-blue-500 scale-110' : 'border-transparent'}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col">
                <p className="text-blue-400 uppercase tracking-widest text-sm">{selectedProduct.category}</p>
                <h2 className="text-4xl font-bold mt-2 mb-6">{selectedProduct.name}</h2>
                <p className="text-5xl font-bold text-blue-400 mb-8">DA {selectedProduct.price}</p>

                {selectedProduct.description && (
                  <p className="text-gray-300 text-lg leading-relaxed mb-10">
                    {selectedProduct.description}
                  </p>
                )}

                <button
                  onClick={() => onAddToCart(selectedProduct)}
                  className="mt-auto bg-white text-black py-5 rounded-2xl font-semibold text-xl hover:bg-blue-600 hover:text-white transition-all active:scale-[0.98]"
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