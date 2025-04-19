import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import { useEffect } from "react";
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from "lucide-react";
import ImageSearch from "../components/ImageSearch";
import { motion } from "framer-motion";

function ProductPage() {
  const {
    currentProduct,
    formData,
    setFormData,
    loading,
    error,
    fetchProduct,
    updateProduct,
    deleteProduct,
  } = useProductStore();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchProduct(id);
  }, [fetchProduct, id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      navigate("/");
    }
  };

  const handleImageSelect = (imageUrl) => {
    setFormData({ ...formData, image: imageUrl });
  };

  if (loading && !currentProduct) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="text-lg">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-32 py-10 max-w-6xl">
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/")} 
        className="btn btn-outline mb-10 gap-2"
      >
        <ArrowLeftIcon className="size-5" />
        Back to Products
      </motion.button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10"
      >
        {/* PRODUCT IMAGE */}
        <div className="card shadow-xl bg-base-100 h-auto">
          <div className="rounded-xl overflow-hidden aspect-square w-full max-h-[600px]">
            {formData?.image ? (
              <img
                src={formData.image}
                alt={formData.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-base-200">
                <p className="text-base-content/50">No image selected</p>
              </div>
            )}
          </div>
        </div>

        {/* PRODUCT FORM */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-8">
            <h2 className="card-title text-3xl mb-8 font-bold">Edit Product</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateProduct(id);
              }}
              className="space-y-8"
            >
              {/* PRODUCT NAME */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-medium">Product Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="input input-bordered w-full text-lg py-6"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* PRODUCT PRICE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-medium">Price</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered w-full text-lg py-6"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>

              {/* PRODUCT IMAGE SEARCH */}
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text text-lg font-medium">Product Image</span>
                </label>
                <ImageSearch
                  onImageSelect={handleImageSelect}
                  initialImage={formData.image}
                />
              </div>

              {/* FORM ACTIONS */}
              <div className="flex justify-between mt-10 pt-6 border-t border-base-200">
                <button 
                  type="button" 
                  onClick={handleDelete} 
                  className="btn btn-error btn-lg gap-2"
                >
                  <Trash2Icon className="size-5" />
                  Delete Product
                </button>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg gap-2"
                  disabled={loading || !formData.name || !formData.price || !formData.image}
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-md" />
                  ) : (
                    <>
                      <SaveIcon className="size-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
export default ProductPage;
