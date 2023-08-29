"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
    price: {
        type: Number
    },
    status: {
        type: String
    },
    deadline: {
        type: String
    },
});
exports.default = mongoose_1.default.model("JobModel", JobModel, "jobs");
//# sourceMappingURL=job.js.map