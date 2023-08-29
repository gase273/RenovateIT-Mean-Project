import mongoose from "mongoose";

const Schema = mongoose.Schema

let CounterModel = new Schema({

    type: {
        type: String
    },
    count: {
        type: Number
    }
})

export default mongoose.model("CounterModel", CounterModel, "counters")