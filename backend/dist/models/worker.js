"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
exports.default = mongoose_1.default.model("WorkerModel", WorkerModel, "workers");
//# sourceMappingURL=worker.js.map