import mongoose from "mongoose";

const Schema = mongoose.Schema;

let RequestModel = new Schema({
    username: {
        type: String
    },
    type: {
        type: String
    },
    workerNum: {
        type: Number
    },
    reason: {
        type: String
    },
    jobId: {
        type: Number
    }
})

export default mongoose.model("RequestModel", RequestModel, "requests")