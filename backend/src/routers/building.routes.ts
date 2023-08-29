import express from 'express'
import { BuildingController } from '../controllers/build.controller'

const buildRouter = express.Router();

buildRouter.route('/addBuild').post(
    (req, res) => new BuildingController().addBuilding(req, res)
)

buildRouter.route('/getCliBuilds').post(
    (req, res) => new BuildingController().getClientBuilds(req, res)
)

buildRouter.route('/rmBuild').get(
    (req, res) => new BuildingController().removeBuild(req, res)
)

buildRouter.route('/getBuild').get(
    (req, res) => new BuildingController().getBuilding(req, res)
)

buildRouter.route('/editBuild').post(
    (req, res) => new BuildingController().editBuild(req, res)
)

buildRouter.route('/colorAll').post(
    (req, res) => new BuildingController().colorAllRooms(req, res)
)

buildRouter.route('/colorOne').post(
    (req, res) => new BuildingController().colorSingleRoom(req, res)
)

export default buildRouter