const Product = require('../models/product');

exports.getProducts = async (req, res) => {
    try {
        console.log('Attempting to fetch products...');
        const products = await Product.findAll({
            order: [['createdAt', 'DESC']]
        });
        console.log('Products fetched successfully:', products.length, 'products found');
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error('Error in getProducts:', error);
        res.status(500).json({ 
            success: false, 
            message: "Error Fetching Data from Table",
            error: error.message 
        });
    }
};

exports.createProduct = async (req, res) => {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
        return res.status(400).json({ 
            success: false, 
            message: "All fields are required" 
        });
    }

    try {
        console.log('Attempting to create product:', { name, price, image });
        const newProduct = await Product.create({ name, price, image });
        console.log('Product created successfully:', newProduct);
        res.status(201).json({ success: true, data: newProduct });
    } catch (err) {
        console.error('Error in createProduct:', err);
        res.status(500).json({ 
            success: false, 
            message: "Failed to create product",
            error: err.message 
        });
    }
};

exports.getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        console.log('Attempting to fetch product with ID:', id);
        const product = await Product.findByPk(id);
        if (!product) {
            console.log('Product not found with ID:', id);
            return res.status(404).json({ 
                success: false, 
                message: "No Product with that ID exists" 
            });
        }
        console.log('Product fetched successfully:', product);
        return res.status(200).json({ success: true, data: product });
    } catch (err) {
        console.error('Error in getProduct:', err);
        res.status(500).json({ 
            success: false, 
            message: "Failed to find product",
            error: err.message 
        });
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, image } = req.body;

    try {
        console.log('Attempting to update product with ID:', id);
        const product = await Product.findByPk(id);

        if (!product) {
            console.log('Product not found with ID:', id);
            return res.status(404).json({ 
                success: false, 
                message: "Failed to find the product" 
            });
        }

        await product.update({ name, price, image });
        console.log('Product updated successfully:', product);
        res.status(200).json({ success: true, data: product });
    } catch (err) {
        console.error('Error in updateProduct:', err);
        res.status(500).json({ 
            success: false, 
            message: "Failed to update product",
            error: err.message 
        });
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        console.log('Attempting to delete product with ID:', id);
        const product = await Product.findByPk(id);
        if (!product) {
            console.log('Product not found with ID:', id);
            return res.status(404).json({ 
                success: false, 
                message: "Product not found" 
            });
        }

        await product.destroy();
        console.log('Product deleted successfully');
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (err) {
        console.error('Error in deleteProduct:', err);
        res.status(500).json({ 
            success: false, 
            message: "Failed to delete product",
            error: err.message 
        });
    }
};