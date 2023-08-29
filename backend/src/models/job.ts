import mongoose from "mongoose";

const Schema = mongoose.Schema;

let JobModel = new Schema({
    jobId: {
        type: Number
    },
    buildId: {
        type: Number
    },
    client: {
        type: String
    },
    agency: {
        type: String
    },
    price : {
        type: Number
    },
    status: {
        type: String
    },
    deadline: {
        type: String
    },
})

export default mongoose.model("JobModel", JobModel, "jobs");