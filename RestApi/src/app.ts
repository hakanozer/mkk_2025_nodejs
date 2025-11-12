import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { dbConnect } from './configs/db';
import { globalException } from './configs/globalException';
import { globalFilter } from './configs/globalFilter';
import cors from 'cors';
import { corsOptions } from './utils/appConst';

// import controllers
import { userController } from './controllers/userController';
import { productController } from './controllers/productController';
import { categoryController } from './controllers/categoryController';


// .env configuration file loading
dotenv.config();

// db conection call
dbConnect()

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.use(cors(corsOptions))
app.use(globalFilter);

app.use('/api/v1/users', userController);
app.use('/api/v1/products', productController);
app.use('/api/v1/categories', categoryController);

app.use(globalException);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});