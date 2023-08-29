"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const worker_controller_1 = require("../controllers/worker.controller");
const workerRouter = express_1.default.Router();
workerRouter.route('/addWorker').post((req, res) => new worker_controller_1.WorkerController().addWorker(req, res));
workerRouter.route('/editWorker').post((req, res) => new worker_controller_1.WorkerController().editWorker(req, res));
workerRouter.route('/rmWorker').get((req, res) => new worker_controller_1.WorkerController().removeWorker(req, res));
workerRouter.route('/asgnWorker').post((req, res) => new worker_controller_1.WorkerController().assignWorker(req, res));
workerRouter.route('/relWorkers').get((req, res) => new worker_controller_1.WorkerController().releaseWorkers(req, res));
workerRouter.route('/getAvailWorker').post((req, res) => new worker_controller_1.WorkerController().getAllAvailable(req, res));
workerRouter.route('/getOnJobWorker').get((req, res) => new worker_controller_1.WorkerController().getAllOnJob(req, res));
workerRouter.route('/getFromAgency').post((req, res) => new worker_controller_1.WorkerController().getAllFromAgency(req, res));
exports.default = workerRouter;
//# sourceMappingURL=worker.routes.js.map