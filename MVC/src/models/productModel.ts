import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
    name: string,
    description?: string,
    price: number,
    inStock: boolean,
    categories: mongoose.Types.ObjectId[],
    dateAdded?: Date,
    authorId: mongoose.Types.ObjectId
}

const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true, min: 0},
    inStock: {type: Boolean, required: true, default: true},
    categories: {type: [mongoose.Schema.Types.ObjectId], ref: 'Category', required: true, default: []},
    dateAdded: {
        type: Date,
        default: () => {
            const now = new Date();
            return now.setHours(now.getHours() + 3);
        }
    },
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})

const ProductDB = mongoose.model<IProduct>('Product', ProductSchema)
export default ProductDB;