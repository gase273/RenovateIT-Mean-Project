import mongoose from "mongoose";

const Schema = mongoose.Schema

let BuildingModel = new Schema({
    buildId: {
        type: Number
    },
    owner: {
        type: String
    },
    type: {
        type: String
    },
    address: {
        type: String
    },
    squares: {
        type: Number
    },
    rooms: {
        type: Array
    },
    doors: {
        type: Array
    }
})

export default mongoose.model("BuildingModel", BuildingModel, "buildings")