import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique : true,
        dropDups: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    }
})

const UserModel = mongoose.model('User', userShema)
export { UserModel }