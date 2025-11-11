// usercontroller.ts
import express, { Request, Response } from 'express';
import { IUser } from '../models/userModel';
import { register } from '../services/userService';

export const userController = express.Router();

userController.post('/login', (req: Request, res: Response) => {
    const user = req.body;
    res.json( user );
});

userController.post('/register', (req: Request, res: Response) => {
    const user = req.body as IUser
    register(user)
    res.json(user);
});