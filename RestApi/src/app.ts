import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { userController } from './controllers/userController';
import { dbConnect } from './configs/db';

// .env configuration file loading
dotenv.config();

// db conection call
dbConnect()

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.use('/api/v1/users', userController);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});