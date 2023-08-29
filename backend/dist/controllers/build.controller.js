"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildingController = void 0;
const building_1 = __importDefault(require("../models/building"));
const counter_1 = __importDefault(require("../models/counter"));
class BuildingController {
    constructor() {
        this.addBuilding = (req, res) => {
            counter_1.default.findOneAndUpdate({ "type": "building" }, { $inc: { "count": 1 } }, { returnDocument: "before" }, (err, id) => {
                if (err)
                    console.log(err);
                else {
                    let owner = req.body.owner;
                    let type = req.body.type;
                    let address = req.body.address;
                    let squares = req.body.squares;
                    let rooms = req.body.rooms;
                    let doors = req.body.doors;
                    let newBuild = new building_1.default({
                        buildId: id.count,
                        owner: owner,
                        type: type,
                        address: address,
                        squares: squares,
                        rooms: rooms,
                        doors: doors
                    });
                    newBuild.save((err, resp) => {
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
        this.getClientBuilds = (req, res) => {
            let owner = req.body.owner;
            building_1.default.find({ "owner": owner }, (err, builds) => {
                if (err)
                    console.log(err);
                else
                    res.json(builds);
            });
        };
        this.removeBuild = (req, res) => {
            let id = req.query.id;
            building_1.default.deleteOne({ "buildId": id }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.getBuilding = (req, res) => {
            let id = req.query.id;
            building_1.default.findOne({ "buildId": id }, (err, build) => {
                if (err)
                    console.log(err);
                else
                    res.json(build);
            });
        };
        this.editBuild = (req, res) => {
            let id = req.body.id;
            let owner = req.body.owner;
            let type = req.body.type;
            let address = req.body.address;
            let squares = req.body.squares;
            let rooms = req.body.rooms;
            let doors = req.body.doors;
            building_1.default.updateOne({ "buildId": id }, { $set: { "owner": owner, "type": type, "address": address, "squares": squares, "rooms": rooms, "doors": doors } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.colorAllRooms = (req, res) => {
            let color = req.body.color;
            let id = req.body.id;
            building_1.default.updateOne({ "buildId": id }, { $set: { "rooms.$[].color": color } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "status": "error" });
                }
                else
                    res.json({ "status": "ok" });
            });
        };
        this.colorSingleRoom = (req, res) => {
            let color = req.body.color;
            let id = req.body.id;
            let index = req.body.index;
            building_1.default.updateOne({ "buildId": id }, { $set: { [`rooms.${index}.color`]: color } }, (err, resp) => {
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
exports.BuildingController = BuildingController;
//# sourceMappingURL=build.controller.js.map