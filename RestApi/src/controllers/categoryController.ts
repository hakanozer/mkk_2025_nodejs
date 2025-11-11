import express from "express";
import { ICategory } from "../models/categoryModel";
import { addCategory, getCategories } from "../services/categoryService";
import { AuthRequest, checkRole, verifyToken } from "../configs/auth";
import { eRoles } from "../utils/eRoles";
import { JwtPayload } from "jsonwebtoken";

export const categoryController = express.Router();

categoryController.post('/add', verifyToken, checkRole(eRoles.Admin), async (req: AuthRequest, res) => {
    const category = req.body as ICategory
    const user = req.user as JwtPayload
    category.authorId = user.id;
    const result = await addCategory(category)
    res.status(result.code).json(result)
});

// tüm kategorileri getirme
categoryController.get('/list', async (req, res) => {
    const result = await getCategories();
    res.status(result.code).json(result);
});