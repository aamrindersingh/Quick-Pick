import { useState } from "react";
import { EditIcon, Trash2Icon, ShoppingCartIcon, Eye, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import { useCartStore } from "../store/useCartStore";

function ProductCard({ product }) {
  const [isAdding, setIsAdding] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const { deleteProduct } = useProductStore();
  const { addToCart } = useCartStore();
  
  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product.id);
    
    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  return (
    <div 
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group"
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      {/* PRODUCT IMAGE */}
      <figure className="relative pt-[80%]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Quick actions overlay */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 ${showButtons ? 'opacity-100' : 'opacity-0'}`}>
          <Link 
            to={`/product/${product.id}`} 
            className="btn btn-circle btn-md bg-white/80 hover:bg-white text-black border-none"
          >
            <Eye className="size-5" />
          </Link>
          
          <button
            className="btn btn-circle btn-md bg-red-500/80 hover:bg-red-500 text-white border-none"
            onClick={() => deleteProduct(product.id)}
          >
            <Trash2Icon className="size-5" />
          </button>
        </div>
        
        {/* Sale tag */}
        <div className="absolute top-4 left-4">
          <span className="badge badge-lg badge-secondary animate-pulse font-bold px-3 py-3">Sale</span>
        </div>
      </figure>

      <div className="card-body p-6">
        {/* PRODUCT INFO */}
        <h2 className="card-title text-xl font-bold tracking-tight">{product.name}</h2>
        <div className="flex justify-between items-center mt-2">
          <p className="text-2xl font-extrabold text-primary">${Number(product.price).toFixed(2)}</p>
          <div className="badge badge-ghost">In Stock</div>
        </div>

        {/* ADD TO CART BUTTON */}
        <div className="mt-4">
          <button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`btn btn-primary w-full h-14 text-lg font-bold transition-all duration-300 ${
              isAdding ? 'bg-success text-success-content' : ''
            }`}
          >
            {isAdding ? (
              <>
                <CheckCircle className="size-6 mr-2" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCartIcon className="size-6 mr-2" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
