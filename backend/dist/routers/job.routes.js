"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const job_controller_1 = require("../controllers/job.controller");
const jobRouter = express_1.default.Router();
jobRouter.route('/addJob').post((req, res) => new job_controller_1.JobController().addJob(req, res));
jobRouter.route('/getAllJobs').get((req, res) => new job_controller_1.JobController().getAllJobs(req, res));
jobRouter.route('/getCliJobs').post((req, res) => new job_controller_1.JobController().getClientJobs(req, res));
jobRouter.route('/getAgentReq').post((req, res) => new job_controller_1.JobController().getAgentJobRequests(req, res));
jobRouter.route('/getAgentWork').post((req, res) => new job_controller_1.JobController().getAgentJobsInProgress(req, res));
jobRouter.route('/getJob').get((req, res) => new job_controller_1.JobController().getJobById(req, res));
jobRouter.route('/setJobOffer').post((req, res) => new job_controller_1.JobController().setJobOffer(req, res));
jobRouter.route('/refJob').get((req, res) => new job_controller_1.JobController().refuseJob(req, res));
jobRouter.route('/delJob').get((req, res) => new job_controller_1.JobController().delJob(req, res));
jobRouter.route('/delJobs').get((req, res) => new job_controller_1.JobController().delJobs(req, res));
jobRouter.route('/acceptJob').get((req, res) => new job_controller_1.JobController().acceptJob(req, res));
jobRouter.route('/agencyFinish').get((req, res) => new job_controller_1.JobController().agencyFinish(req, res));
jobRouter.route('/clientFinish').get((req, res) => new job_controller_1.JobController().finishJob(req, res));
jobRouter.route('/cancelJob').get((req, res) => new job_controller_1.JobController().cancelJob(req, res));
exports.default = jobRouter;
//# sourceMappingURL=job.routes.js.map