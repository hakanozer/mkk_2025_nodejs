import express, {Request, Response} from 'express'
import { userLogin } from '../services/userService'

export const userController = express.Router()

userController.get('/', (req: Request, res: Response) => { 
    res.render('login')
})

userController.post('/userLogin', async (req: Request, res: Response) => { 
    const email = req.body.email;
    const password = req.body.password;
    const dbUser = await userLogin(email, password);
    if (dbUser) {
        return req.session.regenerate((err) => {
            if (err) return res.redirect('/');

            req.session.item = dbUser;
            return res.redirect('/dashboard');
        });
    }
    return res.redirect('/');
});


userController.get('/logout', (req: Request, res: Response) => { 
    req.session.destroy(() => {
        res.redirect('/')
    })
})