"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
exports.default = mongoose_1.default.model("RequestModel", RequestModel, "requests");
//# sourceMappingURL=request.js.map