import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routers/user.routes';
import buildRouter from './routers/building.routes';
import jobRouter from './routers/job.routes';
import workerRouter from './routers/worker.routes';
import reqRouter from './routers/request.routes';

const path = require("path");  

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('src'));
app.use('/images', express.static(path.join(__dirname, "images")));  

mongoose.connect('mongodb://127.0.0.1:27017/Projekat'); //127.0.0.1 umesto localhost
const conn = mongoose.connection;
conn.once('open', () => {
    console.log("Connected to DB")
})

const router = express.Router();
router.use('/users', userRouter);
router.use('/builds', buildRouter);
router.use('/jobs', jobRouter);
router.use('/workers', workerRouter);
router.use('/reqs', reqRouter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));