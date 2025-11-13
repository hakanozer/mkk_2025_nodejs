import express, {Request, Response} from 'express'
import { userLogin } from '../services/userService'

export const userController = express.Router()

userController.get('/', (req: Request, res: Response) => { 
    res.render('login')
})

userController.post('/userLogin', async (req: Request, res: Response) => { 
    const email = req.body.email
    const password = req.body.password
    const validUser = await userLogin(email, password)
    console.log(validUser)
    res.redirect('/')
})