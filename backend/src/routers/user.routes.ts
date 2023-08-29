import express from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();
const upload = require("../middleware/fileuploader");

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)

userRouter.route('/registerClient').post(upload.single("profile_pic"),
    (req, res) => new UserController().registerClient(req, res)
)

userRouter.route('/addClient').post(upload.single("profile_pic"),
    (req, res) => new UserController().addClient(req, res)
)

userRouter.route('/fetchUsers').get(
    (req, res) => new UserController().fetchAllUsers(req, res)
)

userRouter.route('/registerAgency').post(upload.single("profile_pic"),
    (req, res) => new UserController().registerAgency(req, res)
)

userRouter.route('/addAgency').post(upload.single("profile_pic"),
    (req, res) => new UserController().addAgency(req, res)
)

userRouter.route('/editClient').post(
    (req, res) => new UserController().editClient(req, res)
)

userRouter.route('/editAgency').post(
    (req, res) => new UserController().editAgency(req, res)
)

userRouter.route('/editPass').post(
    (req, res) => new UserController().editPass(req, res)
)

userRouter.route('/editImg').post(upload.single("profile_pic"),
    (req, res) => new UserController().editImg(req, res)
)

userRouter.route('/resetPass').post(
    (req, res) => new UserController().resetPass(req, res)
)

userRouter.route('/getAllAgencies').get(
    (req, res) => new UserController().getAllAgencies(req, res)
)

userRouter.route('/getUser').get(
    (req, res) => new UserController().getUser(req, res)
)

userRouter.route('/getReviews').post(
    (req, res) => new UserController().getUserReviews(req, res)
)

userRouter.route('/leaveReview').post(
    (req, res) => new UserController().leaveReview(req, res)
)

userRouter.route('/leaveReview').post(
    (req, res) => new UserController().leaveReview(req, res)
)

userRouter.route('/updateReview').post(
    (req, res) => new UserController().updateReview(req, res)
)

userRouter.route('/setStatus').post(
    (req, res) => new UserController().setUserStatus(req, res)
)

userRouter.route('/fetchNoAdmin').get(
    (req, res) => new UserController().fetchAllButAdmin(req, res)
)

userRouter.route('/delUser').post(
    (req, res) => new UserController().delUser(req, res)
)

userRouter.route('/incWorkers').post(
    (req, res) => new UserController().incWorkersNum(req, res)
)

userRouter.route('/setWorkers').post(
    (req, res) => new UserController().setWorkersNum(req, res)
)

userRouter.route('/delReview').post(
    (req, res) => new UserController().deleteReview(req, res)
)

export default userRouter;