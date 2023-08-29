"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_routes_1 = __importDefault(require("./routers/user.routes"));
const building_routes_1 = __importDefault(require("./routers/building.routes"));
const job_routes_1 = __importDefault(require("./routers/job.routes"));
const worker_routes_1 = __importDefault(require("./routers/worker.routes"));
const request_routes_1 = __importDefault(require("./routers/request.routes"));
const path = require("path");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static('src'));
app.use('/images', express_1.default.static(path.join(__dirname, "images")));
mongoose_1.default.connect('mongodb://127.0.0.1:27017/Projekat'); //127.0.0.1 umesto localhost
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log("Connected to DB");
});
const router = express_1.default.Router();
router.use('/users', user_routes_1.default);
router.use('/builds', building_routes_1.default);
router.use('/jobs', job_routes_1.default);
router.use('/workers', worker_routes_1.default);
router.use('/reqs', request_routes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map