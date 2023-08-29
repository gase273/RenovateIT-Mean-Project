import express from 'express';
import RequestModel from '../models/request'

export class RequestController {

    getAllRequests = (req: express.Request, res: express.Response) => {
        RequestModel.find({}, (err, reqs) => {
            if(err) console.log(err)
            else res.json(reqs)
        })
    }

    getCancelRequest = (req: express.Request, res: express.Response) => {
        RequestModel.findOne({"jobId": req.body.jobId, "type": "cancel"}, (err, result) => {
            if(err) console.log(err)
            else res.json(result);
        })
    }

    getWorkersRequest = (req: express.Request, res: express.Response) => {
        RequestModel.findOne({"username": req.body.username, "type": "workers"}, (err, result) => {
            if(err) console.log(err)
            else res.json(result);
        })
    }

    addCancelRequest = (req: express.Request, res: express.Response) => {
        let user = req.body.username;
        let reason = req.body.reason;
        let jobId = req.body.jobId
        let newRequest = new RequestModel({
            username: user,
            type: "cancel",
            workerNum: null,
            reason: reason,
            jobId: jobId
        })

        newRequest.save((err, resp) => {
            if(err){
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    addWorkersRequest = (req: express.Request, res: express.Response) => {
        let user = req.body.username;
        let workerNum = req.body.workerNum
        let newRequest = new RequestModel({
            username: user,
            type: "workers",
            workerNum: workerNum,
            reason: null,
            jobId: null
        })

        newRequest.save((err, resp) => {
            if(err){
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    delCancelRequest = (req: express.Request, res: express.Response) => {
        RequestModel.deleteMany({"type": "cancel", "jobId": req.body.jobId}, (err, resp) => {
            if(err){
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    delWorkersRequest = (req: express.Request, res: express.Response) => {
        RequestModel.deleteMany({"username": req.body.username, "type": "workers", "workerNum": req.body.workerNum}, (err, resp) => {
            if(err){
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }
}