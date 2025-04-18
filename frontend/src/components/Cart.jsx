import { useEffect } from "react";
import { ShoppingCartIcon, Trash2Icon, PlusIcon, MinusIcon } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

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
      <div className="flex items-center justify-center h-64">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <ShoppingCartIcon className="size-8" />
          Shopping Cart
        </h1>
        {cartItems.length > 0 && (
          <button 
            onClick={clearCart}
            className="btn btn-error btn-sm"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCartIcon className="size-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600">Add some products to your cart</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {cartItems.map((item) => (
            <div 
              key={item.id}
              className="card card-side bg-base-100 shadow-xl"
            >
              <figure className="w-48">
                <img 
                  src={item.Product.image} 
                  alt={item.Product.name}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.Product.name}</h2>
                <p className="text-lg font-semibold">
                  ${(item.Product.price * item.quantity).toFixed(2)}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateCartItem(item.id, item.quantity - 1)}
                      className="btn btn-circle btn-sm"
                      disabled={item.quantity <= 1}
                    >
                      <MinusIcon className="size-4" />
                    </button>
                    <span className="text-lg font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartItem(item.id, item.quantity + 1)}
                      className="btn btn-circle btn-sm"
                    >
                      <PlusIcon className="size-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="btn btn-error btn-sm"
                  >
                    <Trash2Icon className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Total Items: {getTotalItems()}</h3>
                  <h3 className="text-xl font-bold">Total Price: ${getTotalPrice().toFixed(2)}</h3>
                </div>
                <button className="btn btn-primary">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart; 