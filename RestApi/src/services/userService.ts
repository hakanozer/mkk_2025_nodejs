import UserDB, { IUser } from "../models/userModel";

export const register = async (user: IUser) => {
    const userFind = await UserDB.findOne({email: user.email})
    if (userFind) {
        // kullanıcı daha önceden var
        console.log('kullanıcı var')
    } else {
        // kullanıcı yok ekle
        console.log('kullanıcı yok, ekle')
    }
}