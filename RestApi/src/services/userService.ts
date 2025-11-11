import { SECRET_KEY } from "../configs/auth";
import { jsonResult } from "../models/result";
import UserDB, { IUser } from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (user: IUser) => {
    const userFind = await UserDB.findOne({email: user.email})
    if (userFind) {
        return jsonResult(400, false, 'Bu email ile daha önce kayıt olunmuş', null);
    } else {
        const newPassword = await bcrypt.hash(user.password, 10);
        user.password = newPassword;
        const newUser = new UserDB(user);
        const savedUser = await newUser.save();
        return jsonResult(201, true, 'Kullanıcı başarıyla oluşturuldu', savedUser);
    }
}

export const login = async (user: IUser) => { 
    const userFind = await UserDB.findOne({email: user.email})
    if (!userFind) {
        return jsonResult(404, false, 'Kullanıcı bulunamadı', null);
    } else {
        const isMatch = await bcrypt.compare(user.password, userFind.password);
        if (!isMatch) {
            return jsonResult(401, false, 'Parola yanlış', null);
        } else {
            const jwtToken = jwt.sign(
                {
                    id: userFind._id,
                    name: userFind.name,
                    email: userFind.email,
                    roles: userFind.roles
                },SECRET_KEY,
                { expiresIn: '1h' }
            );
            userFind.jwt = jwtToken;
            userFind.password = undefined;
            return jsonResult(200, true, 'Giriş başarılı', userFind);
        }
    }
}