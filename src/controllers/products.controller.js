import Product from "../models/Product"

export const createProduct = async(req, res) =>{
    const {name,category,price,imgUrl} = req.body;
    try {
        const newProduct = new Product({
            name,
            category,
            price,
            imgUrl
        })
        const productSaved = await newProduct.save()
        res.status(201).json(productSaved)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Porfavor hable con el administrador'
        })
    }
}

export const getProducts = async(req, res) =>{
    const {page = 1, limit = 5 } = req.query;
    try {
        const products = await Product.find()
            .limit(limit*1)
            .skip((page -1) * limit)
            .exec();
            
        const count = await Product.countDocuments();

        return res.json({
            products,
            totalPages: Math.ceil(count/limit),
            currentPage: page
        });
    } catch (error) {
        console.error(error)
    }
}

export const getProductById = async(req, res) =>{
    try {
        const product = await Product.findById(req.params.productId)
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Porfavor hable con el administrador'
        })
    }
}

export const updateProductById = async(req, res) =>{
    const { productId } = req.params;
    try {
        const producto = await Product.findById(productId);
        if(!producto){
            return res.status(404).json({
                ok: false,
                msg: 'El producto no existe'
            });
        }
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body,{
            new: true
        })
        res.status(200).json(updatedProduct)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Porfavor hable con el administrador'
        })
    }
}

export const deleteProductById = async(req, res) =>{
    const { productId } = req.params;
    try {
        const producto = await Product.findById(productId);
        if(!producto){
            return res.status(404).json({
                ok: false,
                msg: 'El producto no existe'
            });
        }
        await Product.findByIdAndDelete(productId);
        res.status(204).json();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Porfavor hable con el administrador'
        })
    }
}
