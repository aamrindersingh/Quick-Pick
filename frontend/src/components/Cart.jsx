import { useEffect } from "react";
import { ShoppingCartIcon, Trash2Icon, PlusIcon, MinusIcon, ArrowLeftIcon, CreditCardIcon } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Cart() {
  const { 
    cartItems, 
    loading, 
    error, 
    fetchCartItems, 
    updateCartItem, 
    removeFromCart, 
    clearCart,
    getTotalItems,
    getTotalPrice
  } = useCartStore();

  useEffect(() => {
    fetchCartItems();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] pt-32">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-3xl mx-auto my-8 mt-32 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span className="text-lg">{error}</span>
      </div>
    );
  }

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
    <div className="container mx-auto px-2 pt-20 pb-6 max-w-3xl">
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <h1 className="text-2xl font-extrabold flex items-center gap-2">
          <ShoppingCartIcon className="size-6 text-primary" />
          <span>Quick Pick Cart</span>
          <span className="text-xs font-normal text-base-content/60 ml-1">
            ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})
          </span>
        </h1>
        
        <div className="flex gap-2 flex-wrap">
          <Link to="/" className="btn btn-outline btn-xs gap-1 min-w-[120px] px-3 py-2 text-xs flex items-center justify-center">
            <ArrowLeftIcon className="size-3.5" />
            <span className="truncate">Continue Shopping</span>
          </Link>
          
          {cartItems.length > 0 && (
            <button 
              onClick={clearCart}
              className="btn btn-error btn-xs gap-1 min-w-[100px] px-3 py-2 text-xs flex items-center justify-center"
            >
              <Trash2Icon className="size-3.5" />
              <span className="truncate">Clear Cart</span>
            </button>
          )}
        </div>
      </motion.div>

      {cartItems.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 bg-base-200 rounded-2xl shadow-inner"
        >
          <ShoppingCartIcon className="size-24 mx-auto mb-6 text-base-content/30" />
          <h2 className="text-3xl font-bold mb-3">Your Quick Pick cart is empty</h2>
          <p className="text-xl text-base-content/60 mb-8">Looks like you haven't added any products yet</p>
          <Link to="/" className="btn btn-primary btn-lg">
            Start Shopping
          </Link>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            className="md:col-span-2"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {cartItems.map((item) => (
              <motion.div 
                key={item.id}
                variants={item}
                className="card card-side bg-base-100 shadow-xl mb-6 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <figure className="w-40 md:w-48 h-40 md:h-48 relative group">
                  <img 
                    src={item.Product.image} 
                    alt={item.Product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </figure>
                <div className="card-body">
                  <div className="flex justify-between">
                    <h2 className="card-title text-xl">{item.Product.name}</h2>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="btn btn-circle btn-sm btn-ghost text-error"
                    >
                      <Trash2Icon className="size-5" />
                    </button>
                  </div>
                  
                  <p className="text-2xl font-bold text-primary mt-2">
                    ${(item.Product.price * item.quantity).toFixed(2)}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <div className="join border rounded-lg overflow-hidden">
                      <button 
                        onClick={() => updateCartItem(item.id, item.quantity - 1)}
                        className="join-item btn btn-sm"
                        disabled={item.quantity <= 1}
                      >
                        <MinusIcon className="size-4" />
                      </button>
                      <div className="join-item bg-base-100 px-4 flex items-center justify-center text-base font-medium">
                        {item.quantity}
                      </div>
                      <button 
                        onClick={() => updateCartItem(item.id, item.quantity + 1)}
                        className="join-item btn btn-sm"
                      >
                        <PlusIcon className="size-4" />
                      </button>
                    </div>
                    <div className="badge badge-neutral min-w-[120px] h-auto py-2.5 px-4 flex items-center justify-center text-sm whitespace-nowrap">
                      ${Number(item.Product.price).toFixed(2)} each
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="card bg-base-100 shadow-xl sticky top-28">
              <div className="card-body">
                <h3 className="text-2xl font-bold mb-6 pb-4 border-b">Order Summary</h3>
                
                <div className="space-y-3 text-lg">
                  <div className="flex justify-between">
                    <span className="text-base-content/70">Subtotal</span>
                    <span className="font-semibold">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-base-content/70">Shipping</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-base-content/70">Tax</span>
                    <span className="font-semibold">${(getTotalPrice() * 0.1).toFixed(2)}</span>
                  </div>
                  
                  <div className="divider my-2"></div>
                  
                  <div className="flex justify-between text-xl">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-primary">${(getTotalPrice() * 1.1).toFixed(2)}</span>
                  </div>
                </div>
                
                <button className="btn btn-primary mt-6 w-full h-auto min-h-[60px] py-4 text-base gap-2 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-2">
                    <CreditCardIcon className="size-5" />
                    <span>Proceed to</span>
                  </div>
                  <span>Checkout</span>
                </button>
                
                <div className="text-center text-sm text-base-content/60 mt-4">
                  Secure checkout • Free returns • 2-year warranty
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Cart;