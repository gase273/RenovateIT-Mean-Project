import express from 'express'
import UserModel from '../models/user'
import fs from 'fs';

const nodemailer = require('nodemailer')
const transporter = require("../middleware/mailer")

const resets = new Map()

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*-? '
function generatePass() {
    let length = 7 + Math.round(Math.random() * 5);
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.round(Math.random() * charactersLength));
    }

    return result;
}

export class UserController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        UserModel.findOne({'username': username, 'password': password}, (err, user) => {
            if(err) console.log(err);
            else res.json(user);
        })
    }

    fetchAllUsers = (req: express.Request, res: express.Response) => {
        UserModel.find({}, (err, data) => {
            if(err) console.log(err)
            else res.json(data)
        })
    }

    fetchAllButAdmin = (req: express.Request, res: express.Response) => {
        UserModel.find({"type": {$ne: 2}}, (err, data) => {
            if(err) console.log(err)
            else res.json(data)
        })
    }

    registerClient = (req: express.Request, res: express.Response) => {
        let imgName = req.file ? req.file.filename : 'default_icon.jpg';
        let newUser = new UserModel ({
            username: req.body.username,
            password: req.body.password,
            phone: req.body.phone,
            email: req.body.email,
            img: imgName,
            type: 0,
            status: "awaiting",
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            agencyName: null,
            address: null,
            pib: null,
            desc: null,
            allowedWorkers: null,
            reviews: null
        })

        newUser.save((err, resp) => {
            if(err) {
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    addClient = (req: express.Request, res: express.Response) => {
        let imgName = req.file ? req.file.filename : 'default_icon.jpg';
        let newUser = new UserModel ({
            username: req.body.username,
            password: req.body.password,
            phone: req.body.phone,
            email: req.body.email,
            img: imgName,
            type: 0,
            status: "accepted",
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            agencyName: null,
            address: null,
            pib: null,
            desc: null,
            allowedWorkers: null,
            reviews: null
        })

        newUser.save((err, resp) => {
            if(err) {
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    registerAgency = (req: express.Request, res: express.Response) => {
        let imgName = req.file ? req.file.filename : 'default_icon.jpg';
        let newUser = new UserModel ({
            username: req.body.username,
            password: req.body.password,
            phone: req.body.phone,
            email: req.body.email,
            img: imgName,
            type: 1,
            status: "awaiting",
            firstName: null,
            lastName: null,
            agencyName: req.body.agencyname,
            address: req.body.address,
            pib: req.body.pib,
            desc: req.body.desc,
            allowedWorkers: 0,
            reviews: []
        })

        newUser.save((err, resp) => {
            if(err) {
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    addAgency = (req: express.Request, res: express.Response) => {
        let imgName = req.file ? req.file.filename : 'default_icon.jpg';
        let newUser = new UserModel ({
            username: req.body.username,
            password: req.body.password,
            phone: req.body.phone,
            email: req.body.email,
            img: imgName,
            type: 1,
            status: "accepted",
            firstName: null,
            lastName: null,
            agencyName: req.body.agencyname,
            address: req.body.address,
            pib: req.body.pib,
            desc: req.body.desc,
            allowedWorkers: 0,
            reviews: []
        })

        newUser.save((err, resp) => {
            if(err) {
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    editClient = (req: express.Request, res: express.Response) => {
        let usr = req.body.username
        let first = req.body.firstName
        let last = req.body.lastName
        let email = req.body.email
        let phone = req.body.phone
        UserModel.updateOne({"username": usr}, {$set:{"firstName": first, "lastName": last, "email": email, "phone": phone}}, (err, resp) => {
            if(err) {
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    editAgency = (req: express.Request, res: express.Response) => {
        let usr = req.body.username
        let agencyName = req.body.agencyName;
        let address = req.body.address;
        let desc = req.body.desc;
        let email = req.body.email;
        let phone = req.body.phone;
        UserModel.updateOne({"username": usr}, {$set:{"agencyName": agencyName, "address": address, "desc": desc, "email": email, "phone": phone}}, (err, resp) => {
            if(err) {
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    editPass = (req: express.Request, res: express.Response) => {
        let pass = req.body.password
        let usr = req.body.username
        let newPass = req.body.newPass
        if(resets.has(usr)) {
            const timeout = resets.get(usr)
            clearTimeout(timeout);
            resets.delete(usr)
        }
        UserModel.updateOne({"username": usr, "password": pass}, {$set:{"password": newPass}}, (err, resp) => {
            if (err) console.log(err)
            else res.json(resp)
        })
    }

    editImg = (req: express.Request, res: express.Response) => {
        let newImgName = req.file.filename
        let usr = req.body.user
        UserModel.findOneAndUpdate({"username": usr}, {$set:{"img": newImgName}}, {returnDocument: "before"}, (err, resp) => {
            if(err) console.log(err)
            else {
                if(resp['img'] != "default_icon.jpg") {
                    fs.unlink(`src/images/${resp['img']}`, (error) => {
                        if(error) console.log(error)
                    })
                }   
                res.json({"status": "ok", "newImg": req.file.filename})
            }
        })
    }

    resetPass = (req: express.Request, res: express.Response) => {
        let email = req.body.email
        let newPass = generatePass()
        UserModel.findOne({"email": email}, (Err, original) => {
            if(Err) console.log(Err)
            else {
                UserModel.updateOne({"email": email}, {$set:{"password": newPass}}, (err, resp) => {
                    if(err) console.log(err)
                    else if(resp.modifiedCount == 1) {
                        const timeout = setTimeout(() => {
                            UserModel.updateOne({"email": email}, {$set:{"password": original.password}}, (err) => {if(err) console.log(err)})
                            resets.delete(original.username)
                        }, 10*60*1000)
                        let msg = {
                            from: "sergejvukasovic@gmail.com",
                            to: email,
                            subject: "Resetovanje Lozinke",
                            text: "Vaša nova lozinka, koja važi narednih 10 minuta je " + newPass 
                        }
                        resets.set(original.username, timeout)
                        transporter.sendMail(msg).then((info) => {
                            res.json({"status": "ok", "info": info.messageId})
                        }).catch( error => {console.log(error)})
                    }
                    else res.json({"status": "not ok"})
                })
            }        
        })
    }

    getAllAgencies = (req: express.Request, res: express.Response) => {
        UserModel.find({"type": 1, "status": "accepted"}, (err, agencies) => {
            if(err) console.log(err);
            else res.json(agencies);
        })
    }

    getUser = (req: express.Request, res: express.Response) => {
        UserModel.findOne({"username": req.query.user}, (err, user) => {
            if(err) console.log(err)
            else res.json(user)
        })
    }

    approveUser = (req: express.Request, res: express.Response) => {
        UserModel.updateOne({"username": req.query.user}, {$set:{"status": "accepted"}}, (err, resp) => {
            if(err) {
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    denyUser = (req: express.Request, res: express.Response) => {
        UserModel.updateOne({"username": req.query.user}, {$set:{"status": "denied"}}, (err, resp) => {
            if(err) {
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    getUserReviews = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        UserModel.aggregate([{$match: {"reviews.username": username}}, {$unwind: "$reviews"}, {$project: {"reviews": 1, "_id": 0}}], (err, reviews) => {
            if(err) console.log(err)
            else {
                const transformedReviews = reviews.map(item => item.reviews);
                res.json(transformedReviews);
            }
        })
    }

    leaveReview = (req: express.Request, res: express.Response) => {
        let agencyName = req.body.agencyName;
        let review = {
            rating: req.body.rating,
            comment: req.body.comment,
            username: req.body.clientName,
            jobId: req.body.jobId
        }
        UserModel.updateOne({"username": agencyName}, {$push:{"reviews": review}}, (err, resp) => {
            if(err) {
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    updateReview = (req: express.Request, res: express.Response) => {
        UserModel.updateOne({"reviews.jobId": req.body.jobId}, {$set:{"reviews.$.rating": req.body.rating, "reviews.$.comment": req.body.comment}}, (err, resp) => {
            if(err) {
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    setUserStatus = (req: express.Request, res: express.Response) => {
        UserModel.updateOne({"username": req.body.username}, {$set:{"status": req.body.status}}, (err, resp) => {
            if(err) {
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    delUser = (req: express.Request, res: express.Response) => {
        UserModel.deleteOne({"username": req.body.username}, (err, resp) => {
            if(err) {
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    incWorkersNum = (req: express.Request, res: express.Response) => {
        UserModel.updateOne({"username": req.body.username}, {$inc:{"allowedWorkers": 1}}, (err, resp) => {
            if(err) {
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }
    
    setWorkersNum = (req: express.Request, res: express.Response) => {
        UserModel.updateOne({"username": req.body.username}, {$set:{"allowedWorkers": req.body.workerNum}}, (err, resp) => {
            if(err) {
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    deleteReview = (req: express.Request, res: express.Response) => {
        UserModel.updateOne({"username": req.body.username}, {$pull:{"reviews":{"jobId": req.body.jobId}}}, (err, resp) => {
            if(err) {
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

}