import mongoose from "mongoose";

const url = 'mongodb://localhost:27017/nodeApp';
const options = {
    dbName: 'mkk_restapi'
}

export const dbConnect = async () => {
    try {
        await mongoose.connect(url, options)
        console.log("DB Connect Success")
    } catch (error) {
        console.error("DB Connect Fail", error)
    }
}

