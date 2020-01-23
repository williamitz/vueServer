import server = require('./src/classes/server');
import route from './src/routes/route';
import cors = require('cors') ;
import bodyParser = require("body-parser") ;
import express = require('express');

const appGlobal = express();

const Server = server.default.instance;

// parse application/x-www-form-urlencoded
appGlobal.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
appGlobal.use(bodyParser.json());

appGlobal.use( cors( { origin: true, credentials: true } ) );

appGlobal.use(route);

Server.app.use( appGlobal );

Server.onRun();

// Server.onConnectDB('localhost','root','','panelglobal');