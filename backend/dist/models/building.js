"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
exports.default = mongoose_1.default.model("BuildingModel", BuildingModel, "buildings");
//# sourceMappingURL=building.js.map