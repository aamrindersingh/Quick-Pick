import { DollarSignIcon, Package2Icon, PlusCircleIcon } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import ImageSearch from "./ImageSearch";

function AddProductModal() {
  const { addProduct, formData, setFormData, loading } = useProductStore();

  const handleClose = () => {
    const dialog = document.getElementById('add_product_modal');
    if (dialog) dialog.close();
  };

  const handleImageSelect = (imageUrl) => {
    setFormData({ ...formData, image: imageUrl });
  };

  return (
    <dialog id="add_product_modal" className="modal">
      <div className="modal-box max-w-5xl w-11/12 p-0 overflow-hidden">
        <div className="p-6 md:p-8 pb-0">
          {/* CLOSE BUTTON */}
          <button 
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
            onClick={handleClose}
          >
            X
          </button>

          {/* MODAL HEADER */}
          <h3 className="font-bold text-2xl mb-6">Add New Product</h3>
        </div>

        <form onSubmit={addProduct} className="px-6 md:px-8 pb-6 md:pb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* PRODUCT NAME INPUT */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Product Name</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                    <Package2Icon className="size-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    className="input input-bordered w-full pl-10 py-3 text-lg focus:input-primary transition-colors duration-200"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              {/* PRODUCT PRICE INPUT */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Price</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                    <DollarSignIcon className="size-5" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="input input-bordered w-full pl-10 py-3 text-lg focus:input-primary transition-colors duration-200"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* PRODUCT IMAGE SEARCH */}
            <div>
              <ImageSearch 
                onImageSelect={handleImageSelect} 
                initialImage={formData.image} 
              />
            </div>
          </div>

          {/* MODAL ACTIONS */}
          <div className="modal-action mt-8 pt-6 border-t border-base-300">
            <button 
              type="button"
              className="btn btn-ghost btn-lg"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-lg min-w-[140px]"
              disabled={!formData.name || !formData.price || !formData.image || loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-md" />
              ) : (
                <>
                  <PlusCircleIcon className="size-6 mr-2" />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* BACKDROP */}
      <div className="modal-backdrop" onClick={handleClose}>
        <button hidden>close</button>
      </div>
    </dialog>
  );
}
export default AddProductModal;
