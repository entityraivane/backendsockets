"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const server_1 = __importDefault(require("./classes/server"));
const enviroment_1 = require("./global/enviroment");
const router_1 = __importDefault(require("./routes/router"));
const cors_1 = __importDefault(require("cors"));
const server = server_1.default.instance;
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
server.app.use((0, cors_1.default)({ origin: true, credentials: true }));
server.app.use('/', router_1.default);
server.start(() => {
    console.log('servidor corriendo en : ' + enviroment_1.SERVER_PORT);
});
