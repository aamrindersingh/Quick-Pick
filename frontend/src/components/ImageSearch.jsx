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
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    "https://images.unsplash.com/photo-1581539250439-c96689b516dd",
    "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
    "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08"
  ];

  const searchImages = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      if (!UNSPLASH_ACCESS_KEY || UNSPLASH_ACCESS_KEY === "YOUR_UNSPLASH_API_KEY") {
        // If no API key, use placeholders filtered by search term
        const filteredImages = placeholderImages.slice(0, 8); // Just show some placeholder images
        setImages(filteredImages.map(url => ({ 
          id: url, 
          urls: { 
            regular: url,
            thumb: url 
          }
        })));
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
      } else {
        // Real Unsplash API call
        const response = await axios.get("https://api.unsplash.com/search/photos", {
          params: {
            query: searchQuery,
            per_page: 12
          },
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
          }
        });
        setImages(response.data.results);
      }
    } catch (err) {
      console.error("Error searching for images:", err);
      setError("Failed to fetch images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
    onImageSelect(imageUrl);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen && images.length === 0 && !loading) {
      // Load some initial popular images when modal opens
      setSearchQuery("product");
      searchImages();
    }
  }, [isModalOpen]);

  return (
    <div className="w-full">
      <div className="form-control">
        <label className="label">
          <span className="label-text text-base font-medium">Product Image</span>
        </label>

        {selectedImage ? (
          <div className="relative rounded-xl overflow-hidden border border-base-300 h-56 group">
            <img
              src={selectedImage}
              alt="Selected product"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="btn btn-primary btn-sm mr-2"
              >
                Change Image
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedImage("");
                  onImageSelect("");
                }}
                className="btn btn-error btn-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="border-2 border-dashed border-base-300 h-48 rounded-xl flex flex-col items-center justify-center hover:border-primary transition-colors"
          >
            <ImageIcon className="size-8 mb-2 text-base-content/60" />
            <span className="text-base-content/60">Click to search for images</span>
          </button>
        )}
      </div>

      {/* Image Search Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-base-100 p-6 rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] flex flex-col z-50"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Search for Images</h3>
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={() => setIsModalOpen(false)}
                >
                  <XIcon className="size-5" />
                </button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="size-5 text-base-content/50" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for product images..."
                  className="input input-bordered w-full pl-10"
                  onKeyDown={(e) => e.key === "Enter" && searchImages()}
                />
                <button
                  className="btn btn-primary absolute right-0 top-0 bottom-0 rounded-l-none"
                  onClick={searchImages}
                  disabled={loading}
                >
                  {loading ? <Loader2Icon className="size-5 animate-spin" /> : "Search"}
                </button>
              </div>

              {error && (
                <div className="alert alert-error mb-4">
                  <span>{error}</span>
                </div>
              )}

              <div className="overflow-y-auto flex-grow">
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="loading loading-spinner loading-lg text-primary"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.map((image) => (
                      <div
                        key={image.id}
                        className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all hover:scale-105"
                        onClick={() => handleImageSelect(image.urls.regular)}
                      >
                        <img
                          src={image.urls.thumb || image.urls.regular}
                          alt="Product"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {!loading && images.length === 0 && !error && (
                  <div className="text-center py-12 text-base-content/60">
                    <ImageIcon className="size-12 mx-auto mb-4" />
                    <p>Search for images to display results</p>
                  </div>
                )}
              </div>

              <div className="text-xs text-center mt-4 text-base-content/60">
                Images provided by Unsplash
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ImageSearch; 