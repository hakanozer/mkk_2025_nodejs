import express from "express";
import { IProduct } from "../models/productModel";
import { addProduct, getProducts } from "../services/productService";
import { AuthRequest, checkRole, verifyToken } from "../configs/auth";
import { eRoles } from "../utils/eRoles";
import { JwtPayload } from "jsonwebtoken";

export const productController = express.Router();

productController.post('/add', verifyToken, checkRole(eRoles.Admin), async (req: AuthRequest, res) => {
    const product = req.body as IProduct
    const user = req.user as JwtPayload
    product.authorId = user.id;
    const result = await addProduct(product)
    res.status(result.code).json(result)
});

// sayfalama ile ürünleri getirme
productController.get('/list', async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await getProducts(page, limit);
    res.status(result.code).json(result);
});