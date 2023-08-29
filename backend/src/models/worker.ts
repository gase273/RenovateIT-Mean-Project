import mongoose from "mongoose";

const Schema = mongoose.Schema

let WorkerModel = new Schema({
    workerId: {
        type: Number
    },
    agency: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    specialty: {
        type: String
    },
    workingOn: {
        type: Number
    }
})

export default mongoose.model("WorkerModel", WorkerModel, "workers")