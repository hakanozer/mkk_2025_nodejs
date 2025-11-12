import { IAllProduct } from "../models/IAllProduct"
import apiConfig from "./apiConfig"

export const allProducts = () => {
    // This function would typically fetch product data from an API
    return apiConfig.get<IAllProduct>('/products/list?page=1&limit=10')
}