import express from 'express';
import JobModel from '../models/job'
import CounterModel from '../models/counter'

export class JobController {

    addJob = (req: express.Request, res: express.Response) => {
        CounterModel.findOneAndUpdate({"type": "job"}, {$inc:{"count": 1}}, {returnDocument: "before"}, (err, id) => {
            if(err) console.log(err)
            else {
                let objId = req.body.objId;
                let client = req.body.client;
                let agency = req.body.agency;
                let deadline = req.body.deadline;

                let newJob = new JobModel({
                    jobId: id.count,
                    buildId: objId,
                    client: client,
                    agency: agency,
                    price: 0,
                    status: "request",
                    deadline: deadline,
                })

                newJob.save((err, resp) => {
                    if(err) {
                        console.log(err);
                        res.status(400).json({"status": "error"})
                    }
                    else res.json({"status": "ok"})
                })
            }  
        })    
    }

    getAllJobs = (req: express.Request, res: express.Response) => {
        JobModel.find({}, (err, jobs) => {
            if(err) console.log(err)
            else res.json(jobs)
        })
    }

    getClientJobs = (req: express.Request, res: express.Response) => {
        JobModel.find({"client": req.body.clientName}, (err, jobs) => {
            if(err) console.log(err)
            else res.json(jobs)
        })
    }

    getAgentJobRequests = (req: express.Request, res: express.Response) => {
        JobModel.find({"agency": req.body.agencyName, "status": "request"}, (err, requests) => {
            if(err) console.log(err)
            else res.json(requests)
        })
    }

    getAgentJobsInProgress = (req: express.Request, res: express.Response) => {
        JobModel.find({"agency": req.body.agencyName, "status": {$in:["working", "agenFinished"]}}, (err, progress) => {
            if(err) console.log(err)
            else res.json(progress)
        })
    }

    getJobById = (req: express.Request, res: express.Response) => {
        JobModel.findOne({"jobId": req.query.id}, (err, job) => {
            if(err) console.log(err)
            else res.json(job)
        })
    }

    setJobOffer = (req: express.Request, res: express.Response) => {
        JobModel.updateOne({"jobId": req.body.jobId}, {$set:{"price": req.body.price, "status": "reqAccept"}}, (err, resp) => {
            if(err) {
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    refuseJob = (req: express.Request, res: express.Response) => {
        JobModel.updateOne({"jobId": req.query.id}, {$set:{"status": "reqRefuse"}}, (err, resp) => {
            if(err) {
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    delJob = (req: express.Request, res: express.Response) => {
        JobModel.deleteOne({"jobId": req.query.id}, (err, resp) => {
            if(err) {
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    delJobs = (req: express.Request, res: express.Response) => {
        JobModel.deleteMany({"buildId": req.query.id}, (err, resp) => {
            if(err) {
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    acceptJob = (req: express.Request, res: express.Response) => {
        JobModel.updateOne({"jobId": req.query.id}, {$set:{"status": "working"}}, (err, resp) => {
            if(err) {
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    agencyFinish = (req: express.Request, res: express.Response) => {
        JobModel.updateOne({"jobId": req.query.id}, {$set:{"status": "agenFinished"}}, (err, resp) => {
            if(err) {
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    finishJob = (req: express.Request, res: express.Response) => {
        JobModel.updateOne({"jobId": req.query.id}, {$set:{"status": "finished"}}, (err, resp) => {
            if(err) {
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    cancelJob = (req: express.Request, res: express.Response) => {
        JobModel.updateOne({"jobId": req.query.id}, {$set:{"status": "canceled"}}, (err, resp) => {
            if(err) {
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }
}