"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./src/classes/server"));
var cors_1 = __importDefault(require("cors"));
var route_1 = __importDefault(require("./src/routes/route"));
var body_parser_1 = __importDefault(require("body-parser"));
var Server = server_1.default.instance;
// parse application/x-www-form-urlencoded
Server.app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
Server.app.use(body_parser_1.default.json());
Server.app.use(cors_1.default({ origin: true, credentials: true }));
Server.app.use(route_1.default);
Server.onRun(function (error) {
    if (error) {
        return console.log('error al levantar servidor');
    }
    console.log('Corriendo en puerto', Server.port);
});
Server.onConnectDB('localhost', 'root', '', 'panelglobal');
