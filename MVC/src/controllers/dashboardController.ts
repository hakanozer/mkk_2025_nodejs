import express, {Request, Response} from 'express'
import { Types } from 'mongoose';
import { addProduct, allCategories, allProducts } from '../services/dashboardService';
import { IProduct } from '../models/productModel';

export const dashboardController = express.Router()

dashboardController.get('/dashboard', async (req: Request, res: Response) => { 
    const allCat = await allCategories();
    const allProd = await allProducts();
    console.log(allProd);
    res.render('dashboard', { categories: allCat, products: allProd })
})

dashboardController.post('/productAdd', async (req: Request, res: Response) => { 
    const product = req.body as IProduct;
    // ensure the session id is treated as a mongoose ObjectId
    product.authorId = new Types.ObjectId(String(req.session.item._id));
    await addProduct(product);
    res.redirect('/dashboard');
})