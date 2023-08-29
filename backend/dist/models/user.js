"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let UserModel = new Schema({
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
});
exports.default = mongoose_1.default.model("UserModel", UserModel, "users");
//# sourceMappingURL=user.js.map