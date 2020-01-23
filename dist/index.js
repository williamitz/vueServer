"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server = require("./src/classes/server");
var route_1 = __importDefault(require("./src/routes/route"));
var cors = require("cors");
var bodyParser = require("body-parser");
var express = require("express");
var appGlobal = express();
var Server = server.default.instance;
// parse application/x-www-form-urlencoded
appGlobal.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
appGlobal.use(bodyParser.json());
appGlobal.use(cors({ origin: true, credentials: true }));
appGlobal.use(route_1.default);
Server.app.use(appGlobal);
Server.onRun();
// Server.onConnectDB('localhost','root','','panelglobal');
