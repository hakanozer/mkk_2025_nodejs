import CategoryDB, { ICategory } from "../models/categoryModel";
import { jsonResult } from "../models/result";

// category add service
export const addCategory = async (category: ICategory) => { 
    const newCategory = new CategoryDB(category);
    const savedCategory = await newCategory.save();
    return jsonResult(200, true, "Category added successfully", savedCategory);
}

// all categories get service
export const getCategories = async () => {
    const categories = await CategoryDB.find().exec();
    return jsonResult(200, true, "Categories retrieved successfully", categories);
}