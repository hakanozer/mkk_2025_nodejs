import mongoose, { Document } from "mongoose";

export interface ICategory extends Document {
    title: string,
    dateCreated?: Date,
    authorId: mongoose.Types.ObjectId
}

const CategorySchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    dateCreated: {
        type: Date,
        default: () => {
            const now = new Date();
            return now.setHours(now.getHours() + 3);
        }
    },
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})

const CategoryDB = mongoose.model<ICategory>('Category', CategorySchema)
export default CategoryDB;