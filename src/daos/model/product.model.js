import mongoose from "mongoose";

const productCollection = "products"

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    code: { type: Number, required: true},
    price: {type: Number, required: true},
    status: {type: Boolean, required: true}, 
    stock: {type: Number, required: true},
    category: {type: String, required: true, max: 50}, 
    thumbnail: {type: String, required: true, max: 50}, 
})

const productModel = mongoose.model(productCollection, productSchema)

export default productModel 