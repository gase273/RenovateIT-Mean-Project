import express from 'express'
import BuildingModel from '../models/building'
import CounterModel from '../models/counter'

export class BuildingController {

    addBuilding = (req: express.Request, res: express.Response) => {
        CounterModel.findOneAndUpdate({"type": "building"}, {$inc:{"count": 1}}, {returnDocument: "before"}, (err, id) => {
            if(err) console.log(err)
            else {
                let owner = req.body.owner;
                let type = req.body.type;
                let address = req.body.address;
                let squares = req.body.squares;
                let rooms = req.body.rooms;
                let doors = req.body.doors;

                let newBuild = new BuildingModel({
                    buildId: id.count,
                    owner: owner,
                    type: type,
                    address: address,
                    squares: squares,
                    rooms: rooms,
                    doors: doors
                })

                newBuild.save((err, resp) => {
                    if(err) {
                        console.log(err);
                        res.status(400).json({"status": "error"})
                    }
                    else res.json({"status": "ok"})
                })
            }  
        })    
    }

    getClientBuilds = (req: express.Request, res: express.Response) => {
        let owner = req.body.owner
        BuildingModel.find({"owner": owner}, (err, builds) => {
            if(err) console.log(err)
            else res.json(builds);
        })
    }

    removeBuild = (req: express.Request, res: express.Response) => {
        let id = req.query.id
        BuildingModel.deleteOne({"buildId": id}, (err, resp) => {
            if(err){
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    getBuilding = (req: express.Request, res: express.Response) => {
        let id = req.query.id
        BuildingModel.findOne({"buildId": id}, (err, build) => {
            if(err) console.log(err)
            else res.json(build)
        })
    }

    editBuild = (req: express.Request, res: express.Response) => {
        let id = req.body.id
        let owner = req.body.owner;
        let type = req.body.type;
        let address = req.body.address;
        let squares = req.body.squares;
        let rooms = req.body.rooms;
        let doors = req.body.doors;

        BuildingModel.updateOne({"buildId": id}, {$set:{"owner": owner, "type": type, "address": address, "squares": squares, "rooms": rooms, "doors": doors}}, (err, resp) => {
            if(err){
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    colorAllRooms = (req: express.Request, res: express.Response) => {
        let color = req.body.color;
        let id = req.body.id;
        BuildingModel.updateOne({"buildId": id}, {$set:{"rooms.$[].color": color}}, (err, resp) => {
            if(err){
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }

    colorSingleRoom = (req: express.Request, res: express.Response) => {
        let color = req.body.color;
        let id = req.body.id;
        let index = req.body.index;
        BuildingModel.updateOne({"buildId": id}, {$set:{[`rooms.${index}.color`]: color}}, (err, resp) => {
            if(err){
                console.log(err);
                res.status(400).json({"status": "error"})
            }
            else res.json({"status": "ok"})
        })
    }
}