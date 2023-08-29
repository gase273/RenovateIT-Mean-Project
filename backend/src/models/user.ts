import mongoose from "mongoose";

const Schema = mongoose.Schema

let UserModel = new Schema ({
    username: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    img: {
        type: String
    },
    type: {
        type: Number
    },
    status: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    agencyName: {
        type: String
    },
    address: {
        type: String
    },
    pib: {
        type: Number
    },
    desc: {
        type: String
    },
    allowedWorkers: {
        type: Number
    },
    reviews: {
        type: Array
    }
})

export default mongoose.model("UserModel", UserModel, "users");