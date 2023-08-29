"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobController = void 0;
const job_1 = __importDefault(require("../models/job"));
const counter_1 = __importDefault(require("../models/counter"));
class JobController {
    constructor() {
        this.addJob = (req, res) => {
            counter_1.default.findOneAndUpdate({ "type": "job" }, { $inc: { "count": 1 } }, { returnDocument: "before" }, (err, id) => {
                if (err)
                    console.log(err);
                else {
                    let objId = req.body.objId;
                    let client = req.body.client;
                    let agency = req.body.agency;
                    let deadline = req.body.deadline;
                    let newJob = new job_1.default({
                        jobId: id.count,
                        buildId: objId,
                        client: client,
                        agency: agency,
                        price: 0,
                        status: "request",
                        deadline: deadline,
                    });
                    newJob.save((err, resp) => {
                        if (err) {
                            console.log(err);
                            res.status(400).json({ "status": "error" });
                        }
                        else
                            res.json({ "status": "ok" });
                    });
                }
            });
        };
        this.getAllJobs = (req, res) => {
            job_1.default.find({}, (err, jobs) => {
                if (err)
                    console.log(err);
                else
                    res.json(jobs);
            });
        };
        this.getClientJobs = (req, res) => {
            job_1.default.find({ "client": req.body.clientName }, (err, jobs) => {
                if (err)
                    console.log(err);
                else
                    res.json(jobs);
            });
        };
        this.getAgentJobRequests = (req, res) => {
            job_1.default.find({ "agency": req.body.agencyName, "status": "request" }, (err, requests) => {
                if (err)
                    console.log(err);
                else
                    res.json(requests);
            });
        };
        this.getAgentJobsInProgress = (req, res) => {
            job_1.default.find({ "agency": req.body.agencyName, "status": { $in: ["working", "agenFinished"] } }, (err, progress) => {
                if (err)
                    console.log(err);
                else
                    res.json(progress);
            });
        };
        this.getJobById = (req, res) => {
            job_1.default.findOne({ "jobId": req.query.id }, (err, job) => {
                if (err)
                    console.log(err);
                else
                    res.json(job);
            });
        };
        this.setJobOffer = (req, res) => {
            job_1.default.updateOne({ "jobId": req.body.jobId }, { $set: { "price": req.body.price, "status": "reqAccept" } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.refuseJob = (req, res) => {
            job_1.default.updateOne({ "jobId": req.query.id }, { $set: { "status": "reqRefuse" } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.delJob = (req, res) => {
            job_1.default.deleteOne({ "jobId": req.query.id }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.delJobs = (req, res) => {
            job_1.default.deleteMany({ "buildId": req.query.id }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.acceptJob = (req, res) => {
            job_1.default.updateOne({ "jobId": req.query.id }, { $set: { "status": "working" } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.agencyFinish = (req, res) => {
            job_1.default.updateOne({ "jobId": req.query.id }, { $set: { "status": "agenFinished" } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.finishJob = (req, res) => {
            job_1.default.updateOne({ "jobId": req.query.id }, { $set: { "status": "finished" } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.cancelJob = (req, res) => {
            job_1.default.updateOne({ "jobId": req.query.id }, { $set: { "status": "canceled" } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
    }
}
exports.JobController = JobController;
//# sourceMappingURL=job.controller.js.map