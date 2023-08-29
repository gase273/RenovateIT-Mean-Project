"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const fs_1 = __importDefault(require("fs"));
const nodemailer = require('nodemailer');
const transporter = require("../middleware/mailer");
const resets = new Map();
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*-? ';
function generatePass() {
    let length = 7 + Math.round(Math.random() * 5);
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.round(Math.random() * charactersLength));
    }
    return result;
}
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.fetchAllUsers = (req, res) => {
            user_1.default.find({}, (err, data) => {
                if (err)
                    console.log(err);
                else
                    res.json(data);
            });
        };
        this.fetchAllButAdmin = (req, res) => {
            user_1.default.find({ "type": { $ne: 2 } }, (err, data) => {
                if (err)
                    console.log(err);
                else
                    res.json(data);
            });
        };
        this.registerClient = (req, res) => {
            let imgName = req.file ? req.file.filename : 'default_icon.jpg';
            let newUser = new user_1.default({
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
            });
            newUser.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.addClient = (req, res) => {
            let imgName = req.file ? req.file.filename : 'default_icon.jpg';
            let newUser = new user_1.default({
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
            });
            newUser.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.registerAgency = (req, res) => {
            let imgName = req.file ? req.file.filename : 'default_icon.jpg';
            let newUser = new user_1.default({
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
            });
            newUser.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.addAgency = (req, res) => {
            let imgName = req.file ? req.file.filename : 'default_icon.jpg';
            let newUser = new user_1.default({
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
            });
            newUser.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.editClient = (req, res) => {
            let usr = req.body.username;
            let first = req.body.firstName;
            let last = req.body.lastName;
            let email = req.body.email;
            let phone = req.body.phone;
            user_1.default.updateOne({ "username": usr }, { $set: { "firstName": first, "lastName": last, "email": email, "phone": phone } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.editAgency = (req, res) => {
            let usr = req.body.username;
            let agencyName = req.body.agencyName;
            let address = req.body.address;
            let desc = req.body.desc;
            let email = req.body.email;
            let phone = req.body.phone;
            user_1.default.updateOne({ "username": usr }, { $set: { "agencyName": agencyName, "address": address, "desc": desc, "email": email, "phone": phone } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.editPass = (req, res) => {
            let pass = req.body.password;
            let usr = req.body.username;
            let newPass = req.body.newPass;
            if (resets.has(usr)) {
                const timeout = resets.get(usr);
                clearTimeout(timeout);
                resets.delete(usr);
            }
            user_1.default.updateOne({ "username": usr, "password": pass }, { $set: { "password": newPass } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json(resp);
            });
        };
        this.editImg = (req, res) => {
            let newImgName = req.file.filename;
            let usr = req.body.user;
            user_1.default.findOneAndUpdate({ "username": usr }, { $set: { "img": newImgName } }, { returnDocument: "before" }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    if (resp['img'] != "default_icon.jpg") {
                        fs_1.default.unlink(`src/images/${resp['img']}`, (error) => {
                            if (error)
                                console.log(error);
                        });
                    }
                    res.json({ "status": "ok", "newImg": req.file.filename });
                }
            });
        };
        this.resetPass = (req, res) => {
            let email = req.body.email;
            let newPass = generatePass();
            user_1.default.findOne({ "email": email }, (Err, original) => {
                if (Err)
                    console.log(Err);
                else {
                    user_1.default.updateOne({ "email": email }, { $set: { "password": newPass } }, (err, resp) => {
                        if (err)
                            console.log(err);
                        else if (resp.modifiedCount == 1) {
                            const timeout = setTimeout(() => {
                                user_1.default.updateOne({ "email": email }, { $set: { "password": original.password } }, (err) => { if (err)
                                    console.log(err); });
                                resets.delete(original.username);
                            }, 10 * 60 * 1000);
                            let msg = {
                                from: "sergejvukasovic@gmail.com",
                                to: email,
                                subject: "Resetovanje Lozinke",
                                text: "Vaša nova lozinka, koja važi narednih 10 minuta je " + newPass
                            };
                            resets.set(original.username, timeout);
                            transporter.sendMail(msg).then((info) => {
                                res.json({ "status": "ok", "info": info.messageId });
                            }).catch(error => { console.log(error); });
                        }
                        else
                            res.json({ "status": "not ok" });
                    });
                }
            });
        };
        this.getAllAgencies = (req, res) => {
            user_1.default.find({ "type": 1, "status": "accepted" }, (err, agencies) => {
                if (err)
                    console.log(err);
                else
                    res.json(agencies);
            });
        };
        this.getUser = (req, res) => {
            user_1.default.findOne({ "username": req.query.user }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.approveUser = (req, res) => {
            user_1.default.updateOne({ "username": req.query.user }, { $set: { "status": "accepted" } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.denyUser = (req, res) => {
            user_1.default.updateOne({ "username": req.query.user }, { $set: { "status": "denied" } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.getUserReviews = (req, res) => {
            let username = req.body.username;
            user_1.default.aggregate([{ $match: { "reviews.username": username } }, { $unwind: "$reviews" }, { $project: { "reviews": 1, "_id": 0 } }], (err, reviews) => {
                if (err)
                    console.log(err);
                else {
                    const transformedReviews = reviews.map(item => item.reviews);
                    res.json(transformedReviews);
                }
            });
        };
        this.leaveReview = (req, res) => {
            let agencyName = req.body.agencyName;
            let review = {
                rating: req.body.rating,
                comment: req.body.comment,
                username: req.body.clientName,
                jobId: req.body.jobId
            };
            user_1.default.updateOne({ "username": agencyName }, { $push: { "reviews": review } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.updateReview = (req, res) => {
            user_1.default.updateOne({ "reviews.jobId": req.body.jobId }, { $set: { "reviews.$.rating": req.body.rating, "reviews.$.comment": req.body.comment } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.setUserStatus = (req, res) => {
            user_1.default.updateOne({ "username": req.body.username }, { $set: { "status": req.body.status } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.delUser = (req, res) => {
            user_1.default.deleteOne({ "username": req.body.username }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.incWorkersNum = (req, res) => {
            user_1.default.updateOne({ "username": req.body.username }, { $inc: { "allowedWorkers": 1 } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.setWorkersNum = (req, res) => {
            user_1.default.updateOne({ "username": req.body.username }, { $set: { "allowedWorkers": req.body.workerNum } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.deleteReview = (req, res) => {
            user_1.default.updateOne({ "username": req.body.username }, { $pull: { "reviews": { "jobId": req.body.jobId } } }, (err, resp) => {
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
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map