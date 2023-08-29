"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let CounterModel = new Schema({
    type: {
        type: String
    },
    count: {
        type: Number
    }
});
exports.default = mongoose_1.default.model("CounterModel", CounterModel, "counters");
//# sourceMappingURL=counter.js.map