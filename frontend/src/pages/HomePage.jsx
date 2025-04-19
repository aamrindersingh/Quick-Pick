import { useEffect, useState } from "react";
import { useProductStore } from "../store/useProductStore";
import { PackageIcon, PlusCircleIcon, RefreshCwIcon, SearchIcon, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/ProductCard";
import AddProductModal from "../components/AddProductModal";
import { motion } from "framer-motion";

function HomePage() {
  const { products, loading, error, fetchProducts } = useProductStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-10">
      {/* HERO SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-3xl mb-12 shadow-lg"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Premium Products Collection</h1>
          <p className="text-xl opacity-80 mb-8">Discover our curated selection of high-quality products</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              className="btn btn-primary btn-lg gap-2"
              onClick={() => document.getElementById("add_product_modal").showModal()}
            >
              <PlusCircleIcon className="size-6" />
              Add New Product
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}>
              Browse Collection
            </button>
          </div>
        </div>
      </motion.div>

      <AddProductModal />

      {/* SEARCH AND FILTERS */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-10"
      >
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
          <div className="flex-1 relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="size-5 text-base-content/50" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="input input-bordered w-full pl-10 pr-4 py-3 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              className="btn btn-ghost gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="size-5" />
              <span className="hidden md:inline">Filters</span>
            </button>
            <button 
              className="btn btn-ghost btn-circle text-primary"
              onClick={fetchProducts}
            >
              <RefreshCwIcon className="size-6" />
            </button>
          </div>
        </div>
        
        {/* FILTER OPTIONS */}
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-base-200 p-6 rounded-xl mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="label font-medium">Sort by</label>
                <select className="select select-bordered w-full">
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div>
              
              <div>
                <label className="label font-medium">Price Range</label>
                <div className="flex items-center gap-2">
                  <input type="range" min="0" max="100" className="range range-primary" />
                </div>
              </div>
              
              <div>
                <label className="label font-medium">Status</label>
                <div className="flex flex-wrap gap-2">
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <input type="checkbox" className="checkbox checkbox-primary" />
                      <span className="label-text ml-2">In Stock</span>
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <input type="checkbox" className="checkbox checkbox-primary" />
                      <span className="label-text ml-2">On Sale</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {error && (
        <div className="alert alert-error max-w-3xl mx-auto my-8 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="text-lg">{error}</span>
        </div>
      )}

      {filteredProducts.length === 0 && !loading && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col justify-center items-center py-16 bg-base-200 rounded-2xl shadow-inner"
        >
          <div className="bg-base-100 rounded-full p-8 shadow-md mb-4">
            <PackageIcon className="size-16 text-primary/70" />
          </div>
          <div className="text-center space-y-3 max-w-md">
            <h3 className="text-3xl font-bold">No products found</h3>
            <p className="text-xl text-base-content/60">
              {searchTerm ? 'No results match your search criteria' : 'Get started by adding your first product to the inventory'}
            </p>
            <button
              className="btn btn-primary btn-lg mt-4"
              onClick={() => document.getElementById("add_product_modal").showModal()}
            >
              <PlusCircleIcon className="size-6 mr-2" />
              Add Your First Product
            </button>
          </div>
        </motion.div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : (
        filteredProducts.length > 0 && (
          <>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold mb-8 border-l-4 border-primary pl-4"
            >
              Products ({filteredProducts.length})
            </motion.h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={item}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </>
        )
      )}
    </div>
  );
}
export default HomePage;
