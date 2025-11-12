// usercontroller.ts
import express, { Request, Response } from 'express';
import { IUser } from '../models/userModel';
import { login, register } from '../services/userService';
import { verifyToken } from '../configs/auth';

export const userController = express.Router();

userController.post('/login', async (req: Request, res: Response) => {
    const user = req.body as IUser;
    const result = await login(user);
    res.cookie('token', result.data?.jwt, {
    httpOnly: true,
    secure: false, // localde https yoksa false olmalı
    sameSite: 'none', // cross-origin cookie için gerekli
    maxAge: 3600000,
    });
    res.status(result.code).json(result);
});

userController.post('/register', async (req: Request, res: Response) => {
    const user = req.body as IUser
    const result = await register(user);
    res.status(result.code).json(result);
});

userController.get('/profile', verifyToken, (req: Request, res: Response) => {
    res.status(200).json({ code: 200, message: 'Profile fetched successfully', data: null });
});