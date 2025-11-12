// usercontroller.ts
import express, { Request, Response } from 'express';
import { IUser } from '../models/userModel';
import { login, register } from '../services/userService';

export const userController = express.Router();

userController.post('/login', async (req: Request, res: Response) => {
    const user = req.body as IUser;
    const result = await login(user);
    res.cookie('token', result.data?.jwt, { httpOnly: true, secure: true, maxAge: 3600000 } );
    res.status(result.code).json(result);
});

userController.post('/register', async (req: Request, res: Response) => {
    const user = req.body as IUser
    const result = await register(user);
    res.status(result.code).json(result);
});