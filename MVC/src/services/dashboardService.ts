import CategoryDB from "../models/categoryModel";
import ProductDB, { IProduct } from "../models/productModel";

export const allCategories = async () => {
    const allCat = await CategoryDB.find();
    return allCat;
}

export const addProduct = async (productData: IProduct) => {
    const newProduct = new ProductDB(productData);
    await newProduct.save();
    return newProduct;
}

export const allProducts = async () => {
    const products = await ProductDB.find().populate('categories').populate('authorId');
    return products;
}

export const deleteProductById = async (id: string) => {
    await ProductDB.findByIdAndDelete(id);
}