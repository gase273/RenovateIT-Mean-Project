import express from 'express';
import { RequestController } from '../controllers/request.controller';

const reqRouter = express.Router();

reqRouter.route('/getAll').get(
    (req, res) => new RequestController().getAllRequests(req, res)
)

reqRouter.route('/getCancel').post(
    (req, res) => new RequestController().getCancelRequest(req, res)
)

reqRouter.route('/getWorkers').post(
    (req, res) => new RequestController().getWorkersRequest(req, res)
)

reqRouter.route('/addCancel').post(
    (req, res) => new RequestController().addCancelRequest(req, res)
)

reqRouter.route('/addWorkers').post(
    (req, res) => new RequestController().addWorkersRequest(req, res)
)

reqRouter.route('/delCancel').post(
    (req, res) => new RequestController().delCancelRequest(req, res)
)

reqRouter.route('/delWorkers').post(
    (req, res) => new RequestController().delWorkersRequest(req, res)
)

export default reqRouter