import express from 'express';
import { JobController } from '../controllers/job.controller';

const jobRouter = express.Router();

jobRouter.route('/addJob').post(
    (req, res) => new JobController().addJob(req, res)
)

jobRouter.route('/getAllJobs').get(
    (req, res) => new JobController().getAllJobs(req, res)
)

jobRouter.route('/getCliJobs').post(
    (req, res) => new JobController().getClientJobs(req, res)
)

jobRouter.route('/getAgentReq').post(
    (req, res) => new JobController().getAgentJobRequests(req, res)
)

jobRouter.route('/getAgentWork').post(
    (req, res) => new JobController().getAgentJobsInProgress(req, res)
)

jobRouter.route('/getJob').get(
    (req, res) => new JobController().getJobById(req, res)
)

jobRouter.route('/setJobOffer').post(
    (req, res) => new JobController().setJobOffer(req, res)
)

jobRouter.route('/refJob').get(
    (req, res) => new JobController().refuseJob(req, res)
)

jobRouter.route('/delJob').get(
    (req, res) => new JobController().delJob(req, res)
)

jobRouter.route('/delJobs').get(
    (req, res) => new JobController().delJobs(req, res)
)

jobRouter.route('/acceptJob').get(
    (req, res) => new JobController().acceptJob(req, res)
)

jobRouter.route('/agencyFinish').get(
    (req, res) => new JobController().agencyFinish(req, res)
)

jobRouter.route('/clientFinish').get(
    (req, res) => new JobController().finishJob(req, res)
)

jobRouter.route('/cancelJob').get(
    (req, res) => new JobController().cancelJob(req, res)
)

export default jobRouter