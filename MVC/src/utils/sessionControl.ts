// session controller middleware to protect dashboard route
import express, {Request, Response, NextFunction} from 'express'

export const sessionControl = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.item) {
        return res.redirect('/')
    }
    res.locals.user = req.session.item;
    next();
}