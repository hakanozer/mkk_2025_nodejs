import UserDB, { IUser } from "../models/userModel"
import bcrypt from 'bcrypt';

export const userLogin = async (email: string, password: string) => {
    const dbUser = await UserDB.findOne( {email: email} )
    if (dbUser) {
        console.log("1", dbUser.name, dbUser.password)
        const isMatch = await bcrypt.compare(password, dbUser.password);
        if (isMatch) {
            console.log("2")
            return true
        }
    }
    console.log("3")
    return false
}