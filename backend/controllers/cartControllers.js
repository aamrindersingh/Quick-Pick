const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getCartItems = async (req, res) => {
    try {
        console.log('Attempting to fetch cart items...');
        const cartItems = await Cart.findAll({
            include: [{
                model: Product,
                attributes: ['id', 'name', 'price', 'image']
            }]
        });
        console.log('Cart items fetched successfully:', cartItems.length, 'items found');
        res.status(200).json({ success: true, data: cartItems });
    } catch (error) {
        console.error('Error in getCartItems:', error);
        res.status(500).json({ 
            success: false, 
            message: "Error fetching cart items",
            error: error.message 
        });
    }
};

exports.addToCart = async (req, res) => {
    const { productId, quantity = 1 } = req.body;

    try {
        console.log('Attempting to add product to cart:', { productId, quantity });
        
        // Check if product exists
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: "Product not found" 
            });
        }

        // Check if item already exists in cart
        let cartItem = await Cart.findOne({ where: { productId } });
        
        if (cartItem) {
            // Update quantity if item exists
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            // Create new cart item
            cartItem = await Cart.create({ productId, quantity });
        }

        console.log('Product added to cart successfully:', cartItem);
        res.status(201).json({ success: true, data: cartItem });
    } catch (error) {
        console.error('Error in addToCart:', error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to add product to cart",
            error: error.message 
        });
    }
};

exports.updateCartItem = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        console.log('Attempting to update cart item:', { id, quantity });
        const cartItem = await Cart.findByPk(id);
        
        if (!cartItem) {
            return res.status(404).json({ 
                success: false, 
                message: "Cart item not found" 
            });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        console.log('Cart item updated successfully:', cartItem);
        res.status(200).json({ success: true, data: cartItem });
    } catch (error) {
        console.error('Error in updateCartItem:', error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to update cart item",
            error: error.message 
        });
    }
};

exports.removeFromCart = async (req, res) => {
    const { id } = req.params;

    try {
        console.log('Attempting to remove cart item:', id);
        const cartItem = await Cart.findByPk(id);
        
        if (!cartItem) {
            return res.status(404).json({ 
                success: false, 
                message: "Cart item not found" 
            });
        }

        await cartItem.destroy();
        console.log('Cart item removed successfully');
        res.status(200).json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        console.error('Error in removeFromCart:', error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to remove item from cart",
            error: error.message 
        });
    }
};

exports.clearCart = async (req, res) => {
    try {
        console.log('Attempting to clear cart...');
        await Cart.destroy({ where: {} });
        console.log('Cart cleared successfully');
        res.status(200).json({ success: true, message: "Cart cleared" });
    } catch (error) {
        console.error('Error in clearCart:', error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to clear cart",
            error: error.message 
        });
    }
}; 