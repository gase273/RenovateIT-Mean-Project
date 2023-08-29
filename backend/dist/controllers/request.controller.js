"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestController = void 0;
const request_1 = __importDefault(require("../models/request"));
class RequestController {
    constructor() {
        this.getAllRequests = (req, res) => {
            request_1.default.find({}, (err, reqs) => {
                if (err)
                    console.log(err);
                else
                    res.json(reqs);
            });
        };
        this.getCancelRequest = (req, res) => {
            request_1.default.findOne({ "jobId": req.body.jobId, "type": "cancel" }, (err, result) => {
                if (err)
                    console.log(err);
                else
                    res.json(result);
            });
        };
        this.getWorkersRequest = (req, res) => {
            request_1.default.findOne({ "username": req.body.username, "type": "workers" }, (err, result) => {
                if (err)
                    console.log(err);
                else
                    res.json(result);
            });
        };
        this.addCancelRequest = (req, res) => {
            let user = req.body.username;
            let reason = req.body.reason;
            let jobId = req.body.jobId;
            let newRequest = new request_1.default({
                username: user,
                type: "cancel",
                workerNum: null,
                reason: reason,
                jobId: jobId
            });
            newRequest.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.addWorkersRequest = (req, res) => {
            let user = req.body.username;
            let workerNum = req.body.workerNum;
            let newRequest = new request_1.default({
                username: user,
                type: "workers",
                workerNum: workerNum,
                reason: null,
                jobId: null
            });
            newRequest.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.delCancelRequest = (req, res) => {
            request_1.default.deleteMany({ "type": "cancel", "jobId": req.body.jobId }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.delWorkersRequest = (req, res) => {
            request_1.default.deleteMany({ "username": req.body.username, "type": "workers", "workerNum": req.body.workerNum }, (err, resp) => {
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
exports.RequestController = RequestController;
//# sourceMappingURL=request.controller.js.map