import { IUserModel } from "../models/IUserModel";
import apiConfig from "./apiConfig";

export const userLogin = async (email: string, password: string) => {
    const sendObj = {
        email,
        password,
    };
    return apiConfig.post<IUserModel>("users/login", sendObj);
}