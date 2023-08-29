import express from 'express';
import WorkerModel from '../models/worker'
import CounterModel from '../models/counter'

export class WorkerController {

    addWorker = (req: express.Request, res: express.Response) => {
        CounterModel.findOneAndUpdate({"type": "worker"}, {$inc:{"count": 1}}, {returnDocument: "before"}, (err, id) => {
            if(err) console.log(err)
            else {
                let agency = req.body.agency
                let firstname = req.body.firstname;
                let lastname = req.body.lastname;
                let email = req.body.email;
                let phone = req.body.phone;
                let specialty = req.body.specialty;

                let newWorker = new WorkerModel({
                    workerId: id.count,
                    agency: agency,
                    firstName: firstname,
                    lastName: lastname,
                    email: email,
                    phone: phone,
                    specialty: specialty,
                    workingOn: -1,
                })

                newWorker.save((err, resp) => {
                    if(err) {
                        console.log(err);
                        res.status(400).json({"status": "error"})
                    }
                    else res.json({"status": "ok"})
                })
            }  
        }) 
    }

    editWorker = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let email = req.body.email;
        let phone = req.body.phone;
        let specialty = req.body.specialty;
        WorkerModel.updateOne({"workerId": id}, {$set:{"firstName": firstname, "lastName": lastname, "email": email, "phone": phone, "specialty": specialty}}, (err, resp) => {
            if(err){
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    removeWorker = (req: express.Request, res: express.Response) => {
        let id = req.query.id
        WorkerModel.deleteOne({"workerId": id}, (err, resp) => {
            if(err){
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    assignWorker = (req: express.Request, res: express.Response) => {
        let workerId = req.body.workerId;
        let index = req.body.index;
        let jobId = req.body.jobId;
        WorkerModel.updateOne({"workerId": workerId}, {$set:{"workingOn": jobId}}, (err, resp) => {
            if(err){
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    releaseWorkers = (req: express.Request, res: express.Response) => {
        let id = req.query.id;
        WorkerModel.updateMany({"jobId": id}, {$set:{"workingOn": -1}}, (err, resp) => {
            if(err){
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    getAllAvailable = (req: express.Request, res: express.Response) => {
        WorkerModel.find({"workingOn": -1, "agency": req.body.agencyname}, (err, workers) => {
            if(err) console.log(err)
            else res.json(workers)
        })
    }

    getAllOnJob = (req: express.Request, res: express.Response) => {
        WorkerModel.find({"workingOn": req.query.id}, (err, workers) => {
            if(err) console.log(err)
            else res.json(workers)
        })
    }

    getAllFromAgency = (req: express.Request, res: express.Response) => {
        WorkerModel.find({"agency": req.body.agencyname}, (err, workers) => {
            if(err) console.log(err)
            else res.json(workers)
        })
    }

}