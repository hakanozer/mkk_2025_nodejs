import UserDB, { IUser } from "../models/userModel"
import bcrypt from 'bcrypt';

export const userLogin = async (email: string, password: string) => {
    const dbUser = await UserDB.findOne( {email: email} )
    if (dbUser) {
        const isMatch = await bcrypt.compare(password, dbUser.password);
        if (isMatch) {
            return dbUser
        }
    }
    return null
}