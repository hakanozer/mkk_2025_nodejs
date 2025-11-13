import express, {Request, Response} from 'express'

export const profileController = express.Router()

profileController.get('/profile', (req: Request, res: Response) => { 
    res.render('profile')
})