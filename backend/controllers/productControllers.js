const Product = require('../models/product');

exports.getProducts = async (req, res) => {

    try{
        const products = await Product.findAll({
            order:['createdAt','DESC']
        });
        console.log("Products have been fetched")
        res.status(200).json({success:true,data:products})

    }

    catch(error){{
        console.log(error)
        res.status(500).json({success:false,message:"Error Fetching Data from Table"})
    }}

}


exports.createProduct = async (req,res)=>{

    const {name,price,image} = req.body

    if(!name || !price || !image){
        return res.status(400).json({success:false,message:"All fields are required"})
    }

    try{
        const newProduct = await Product.create({name,price,image})
        res.status(201).json({success:true,data:newProduct})
    } catch(err){
        console.log(err)
        res.status(500).json({success:false,message:"not able to create a product"})
    }

}


exports.getProduct = async (req,res)=>{

    const {id} =req.params;

    try{
        const product =  await Product.findByPk(id)
        if(!product) return res.status(400).json({success:false,message:"No Product with that ID exists"})
        
            return res.stats(200).json({success:true,data:product})
    }

    catch(err){
        console.log(err)
        res.status(500).json({success:false,message:"Failed to find product"})
    }


}


exports.updateProduct = async (req,res)=>{
    const {id} = req.params;
    const {name,body,image} = req.body

    try{
        const product = await Product.findByPk(id)

        if(!product){
            return res.status(404).json({success:false,message:"Failed to find the product"})
        }

        await product.update({name,price,image})

        res.status(200).json({success:true,data:product})

    }

    catch(err){
        console.log("error updated the product")
        res.status(500).json({success:false,message:"error"})
    }

}

exports.deleteProduct = async (req,res)=>{
    const {id} = req.params

    try{
        const product = await Product.findByPk(id)
        if(!product){
            return res.status(404).json({success:false,message:"Product not found"})
        }

        await product.destroy()
    }

    catch(err){
        console.log("Error in deleting the product",err)
        res.status(500).json({success:false,message:"Not able to delete the product"})

    }
    

}   