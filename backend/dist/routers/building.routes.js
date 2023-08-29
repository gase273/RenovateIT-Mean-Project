"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const build_controller_1 = require("../controllers/build.controller");
const buildRouter = express_1.default.Router();
buildRouter.route('/addBuild').post((req, res) => new build_controller_1.BuildingController().addBuilding(req, res));
buildRouter.route('/getCliBuilds').post((req, res) => new build_controller_1.BuildingController().getClientBuilds(req, res));
buildRouter.route('/rmBuild').get((req, res) => new build_controller_1.BuildingController().removeBuild(req, res));
buildRouter.route('/getBuild').get((req, res) => new build_controller_1.BuildingController().getBuilding(req, res));
buildRouter.route('/editBuild').post((req, res) => new build_controller_1.BuildingController().editBuild(req, res));
buildRouter.route('/colorAll').post((req, res) => new build_controller_1.BuildingController().colorAllRooms(req, res));
buildRouter.route('/colorOne').post((req, res) => new build_controller_1.BuildingController().colorSingleRoom(req, res));
exports.default = buildRouter;
//# sourceMappingURL=building.routes.js.map