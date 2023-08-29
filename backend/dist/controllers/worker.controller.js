"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerController = void 0;
const worker_1 = __importDefault(require("../models/worker"));
const counter_1 = __importDefault(require("../models/counter"));
class WorkerController {
    constructor() {
        this.addWorker = (req, res) => {
            counter_1.default.findOneAndUpdate({ "type": "worker" }, { $inc: { "count": 1 } }, { returnDocument: "before" }, (err, id) => {
                if (err)
                    console.log(err);
                else {
                    let agency = req.body.agency;
                    let firstname = req.body.firstname;
                    let lastname = req.body.lastname;
                    let email = req.body.email;
                    let phone = req.body.phone;
                    let specialty = req.body.specialty;
                    let newWorker = new worker_1.default({
                        workerId: id.count,
                        agency: agency,
                        firstName: firstname,
                        lastName: lastname,
                        email: email,
                        phone: phone,
                        specialty: specialty,
                        workingOn: -1,
                    });
                    newWorker.save((err, resp) => {
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
        this.editWorker = (req, res) => {
            let id = req.body.id;
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let email = req.body.email;
            let phone = req.body.phone;
            let specialty = req.body.specialty;
            worker_1.default.updateOne({ "workerId": id }, { $set: { "firstName": firstname, "lastName": lastname, "email": email, "phone": phone, "specialty": specialty } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.removeWorker = (req, res) => {
            let id = req.query.id;
            worker_1.default.deleteOne({ "workerId": id }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.assignWorker = (req, res) => {
            let workerId = req.body.workerId;
            let index = req.body.index;
            let jobId = req.body.jobId;
            worker_1.default.updateOne({ "workerId": workerId }, { $set: { "workingOn": jobId } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.releaseWorkers = (req, res) => {
            let id = req.query.id;
            worker_1.default.updateMany({ "jobId": id }, { $set: { "workingOn": -1 } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.getAllAvailable = (req, res) => {
            worker_1.default.find({ "workingOn": -1, "agency": req.body.agencyname }, (err, workers) => {
                if (err)
                    console.log(err);
                else
                    res.json(workers);
            });
        };
        this.getAllOnJob = (req, res) => {
            worker_1.default.find({ "workingOn": req.query.id }, (err, workers) => {
                if (err)
                    console.log(err);
                else
                    res.json(workers);
            });
        };
        this.getAllFromAgency = (req, res) => {
            worker_1.default.find({ "agency": req.body.agencyname }, (err, workers) => {
                if (err)
                    console.log(err);
                else
                    res.json(workers);
            });
        };
    }
}
exports.WorkerController = WorkerController;
//# sourceMappingURL=worker.controller.js.map