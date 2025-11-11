import ProductDB, { IProduct } from "../models/productModel";
import { jsonResult } from "../models/result";

export const addProduct = async (iProduct: IProduct) => {
    const newProduct = new ProductDB(iProduct);
    const savedProduct = await newProduct.save();
    return jsonResult(200, true, "Ürün Ekleme başarılı", savedProduct);
}

// sayfalama ile Ürünleri getirme
export const getProducts = async (page: number, limit: number) => {
    const products = await ProductDB.find()
        .skip((page - 1) * limit)
        .limit(limit);
    const total = await ProductDB.countDocuments();
    return jsonResult(200, true, "Ürünler başarıyla getirildi", {
        products,
        total,
        page,
        pages: Math.ceil(total / limit)
    });
}