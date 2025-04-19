import { useState, useEffect } from "react";
import { SearchIcon, ImageIcon, Loader2Icon, XIcon } from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

// Get Unsplash API key from environment variables
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

function ImageSearch({ onImageSelect, initialImage = "" }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(initialImage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Predefined categories for quick search
  const categories = [
    "Electronics", "Fashion", "Home Decor", "Furniture", 
    "Watches", "Jewelry", "Shoes", "Bags"
  ];

  // For demo purposes - these are placeholder images if no API key is provided
  const placeholderImages = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    "https://images.unsplash.com/photo-1503602642458-232111445657",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    "https://images.unsplash.com/photo-1560343090-f0409e92791a",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f",
    "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d"
  ];

  const searchImages = async (query = searchQuery) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      if (!UNSPLASH_ACCESS_KEY || UNSPLASH_ACCESS_KEY === "YOUR_UNSPLASH_API_KEY") {
        // If no API key, use placeholders
        setImages(placeholderImages.map(url => ({ 
          id: url, 
          urls: { regular: url, thumb: url }
        })));
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
      } else {
        // Real Unsplash API call
        try {
          const response = await axios.get("https://api.unsplash.com/search/photos", {
            params: {
              query,
              per_page: 24,
              orientation: "landscape"
            },
            headers: {
              Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
            }
          });
          
          if (response.data && response.data.results) {
            setImages(response.data.results);
          } else {
            setImages([]);
          }
        } catch (apiError) {
          console.error("API Error:", apiError);
          // Fallback to placeholder images
          setImages(placeholderImages.map(url => ({ 
            id: url, 
            urls: { regular: url, thumb: url }
          })));
        }
      }
    } catch (err) {
      console.error("Error searching for images:", err);
      setError("Failed to fetch images. Please try again.");
      setImages(placeholderImages.map(url => ({ 
        id: url, 
        urls: { regular: url, thumb: url }
      })));
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
    onImageSelect(imageUrl);
    setIsModalOpen(false);
  };

  const handleCategoryClick = (category) => {
    setSearchQuery(category);
    searchImages(category);
  };

  // Reset search state when modal opens
  useEffect(() => {
    if (isModalOpen) {
      setSearchQuery("");
      setImages([]);
      setHasSearched(false);
      
      // Load popular images as initial content
      searchImages("popular products");
    }
  }, [isModalOpen]);

  // Update selected image when initialImage prop changes
  useEffect(() => {
    setSelectedImage(initialImage);
  }, [initialImage]);

  return (
    <div className="w-full h-full">
      <div className="form-control h-full">
        <label className="label">
          <span className="label-text text-base font-medium">Product Image</span>
        </label>

        {selectedImage ? (
          <div className="relative rounded-xl overflow-hidden border border-base-300 h-full min-h-[200px] aspect-square group">
            <img
              src={selectedImage}
              alt="Selected product"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="btn btn-primary mr-2"
              >
                Change Image
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedImage("");
                  onImageSelect("");
                }}
                className="btn btn-error"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="border-2 border-dashed border-base-300 h-full min-h-[200px] aspect-square rounded-xl flex flex-col items-center justify-center hover:border-primary transition-colors"
          >
            <ImageIcon className="size-10 mb-3 text-base-content/60" />
            <span className="text-base-content/60 text-lg">Click to add image</span>
          </button>
        )}
      </div>

      {/* Image Search Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="fixed inset-4 bg-base-100 rounded-2xl shadow-2xl flex flex-col z-[101] overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-base-300">
              <h3 className="text-2xl font-bold">Find Product Images</h3>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setIsModalOpen(false)}
              >
                <XIcon className="size-5" />
              </button>
            </div>
            
            {/* Body */}
            <div className="flex-1 overflow-hidden flex flex-col">
              {/* Search Bar */}
              <div className="p-6 pb-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <SearchIcon className="size-5 text-base-content/50" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for product images..."
                    className="input input-bordered w-full pl-12 py-6 text-lg"
                    onKeyDown={(e) => e.key === "Enter" && searchImages()}
                    autoFocus
                  />
                  <button
                    className="btn btn-primary absolute right-0 top-0 bottom-0 rounded-l-none px-6 text-lg font-medium"
                    onClick={() => searchImages()}
                    disabled={loading}
                  >
                    {loading ? <Loader2Icon className="size-5 animate-spin mr-2" /> : <SearchIcon className="size-5 mr-2" />}
                    Search
                  </button>
                </div>
                
                {/* Quick Categories */}
                <div className="flex flex-wrap gap-2 mt-4 pb-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      className="badge badge-outline hover:badge-primary py-3 px-3 cursor-pointer transition-colors"
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Error Message */}
              {error && (
                <div className="px-6">
                  <div className="alert alert-error">
                    <span>{error}</span>
                  </div>
                </div>
              )}
              
              {/* Image Grid */}
              <div className="flex-1 overflow-y-auto p-4">
                {loading ? (
                  <div className="flex justify-center items-center h-full py-16">
                    <div className="loading loading-spinner loading-lg text-primary"></div>
                  </div>
                ) : (
                  <>
                    {images.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {images.map((image) => (
                          <div
                            key={image.id}
                            className="rounded-xl overflow-hidden cursor-pointer hover:ring-4 ring-primary transition-all hover:scale-105 shadow-md aspect-square"
                            onClick={() => handleImageSelect(image.urls.regular)}
                          >
                            <img
                              src={image.urls.thumb || image.urls.regular}
                              alt="Product"
                              className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    ) : hasSearched ? (
                      <div className="flex flex-col items-center justify-center h-full">
                        <ImageIcon className="size-16 mb-4 text-base-content/30" />
                        <p className="text-xl">No images found for "{searchQuery}"</p>
                        <p className="text-base-content/60 mt-2">Try another search term</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <ImageIcon className="size-16 mb-4 text-base-content/30" />
                        <p className="text-xl">Search for product images</p>
                        <p className="text-base-content/60 mt-2">Or click a category above to get started</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-base-300 text-center text-sm text-base-content/60">
              Images provided by Unsplash
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageSearch; 