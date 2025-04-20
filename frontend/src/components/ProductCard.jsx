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
      className="card bg-base-100 shadow group"
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      {/* PRODUCT IMAGE */}
      <figure className="relative pt-[60%]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Quick actions overlay */}
        <div className={`absolute inset-0 bg-black/30 flex items-center justify-center gap-1 transition-opacity duration-200 ${showButtons ? 'opacity-100' : 'opacity-0'}`}>
          <Link 
            to={`/product/${product.id}`} 
            className="btn btn-circle btn-xs bg-white/80 hover:bg-white text-black border-none"
          >
            <Eye className="size-4" />
          </Link>
          
          <button
            className="btn btn-circle btn-xs bg-red-500/80 hover:bg-red-500 text-white border-none"
            onClick={() => deleteProduct(product.id)}
          >
            <Trash2Icon className="size-4" />
          </button>
        </div>
        
        {/* Sale tag */}
        <div className="absolute top-2 left-2">
          <span className="badge badge-secondary font-bold px-2 py-1 text-xs">Sale</span>
        </div>
      </figure>

      <div className="card-body p-3">
        {/* PRODUCT INFO */}
        <h2 className="card-title text-base font-bold tracking-tight">{product.name}</h2>
        <div className="flex justify-between items-center mt-1">
          <p className="text-lg font-extrabold text-primary">${Number(product.price).toFixed(2)}</p>
          <div className="badge badge-ghost text-xs">In Stock</div>
        </div>

        {/* ADD TO CART BUTTON */}
        <div className="mt-2">
          <button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`btn btn-primary w-full h-8 text-sm font-bold transition-all duration-200 ${
              isAdding ? 'bg-success text-success-content' : ''
            }`}
          >
            {isAdding ? (
              <>
                <CheckCircle className="size-4 mr-1" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCartIcon className="size-4 mr-1" />
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
