import express from 'express';
import { WorkerController } from '../controllers/worker.controller';

const workerRouter = express.Router();

workerRouter.route('/addWorker').post(
    (req, res) => new WorkerController().addWorker(req, res)
)

workerRouter.route('/editWorker').post(
    (req, res) => new WorkerController().editWorker(req, res)
)

workerRouter.route('/rmWorker').get(
    (req, res) => new WorkerController().removeWorker(req, res)
)

workerRouter.route('/asgnWorker').post(
    (req, res) => new WorkerController().assignWorker(req, res)
)

workerRouter.route('/relWorkers').get(
    (req, res) => new WorkerController().releaseWorkers(req, res)
)

workerRouter.route('/getAvailWorker').post(
    (req, res) => new WorkerController().getAllAvailable(req, res)
)

workerRouter.route('/getOnJobWorker').get(
    (req, res) => new WorkerController().getAllOnJob(req, res)
)

workerRouter.route('/getFromAgency').post(
    (req, res) => new WorkerController().getAllFromAgency(req, res)
)

export default workerRouter