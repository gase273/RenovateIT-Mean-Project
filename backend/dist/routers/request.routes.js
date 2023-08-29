"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_controller_1 = require("../controllers/request.controller");
const reqRouter = express_1.default.Router();
reqRouter.route('/getAll').get((req, res) => new request_controller_1.RequestController().getAllRequests(req, res));
reqRouter.route('/getCancel').post((req, res) => new request_controller_1.RequestController().getCancelRequest(req, res));
reqRouter.route('/getWorkers').post((req, res) => new request_controller_1.RequestController().getWorkersRequest(req, res));
reqRouter.route('/addCancel').post((req, res) => new request_controller_1.RequestController().addCancelRequest(req, res));
reqRouter.route('/addWorkers').post((req, res) => new request_controller_1.RequestController().addWorkersRequest(req, res));
reqRouter.route('/delCancel').post((req, res) => new request_controller_1.RequestController().delCancelRequest(req, res));
reqRouter.route('/delWorkers').post((req, res) => new request_controller_1.RequestController().delWorkersRequest(req, res));
exports.default = reqRouter;
//# sourceMappingURL=request.routes.js.map