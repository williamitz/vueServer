"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// import mysql = require('mysql') ;
var path = require("path");
var server = /** @class */ (function () {
    function server(port) {
        this.app = express();
        // this.httpServer = http.createServer( this.app );
        this.port = port;
        // this.connectDB = mysql.createConnection({
        //   port: 3307,
        //   host: "localhost",
        //   user: "root",
        //   password: "",
        //   database: "globalpanel"
        // });
    }
    Object.defineProperty(server, "instance", {
        get: function () {
            return this._instance || (this._instance = new this(3000));
        },
        enumerable: true,
        configurable: true
    });
    server.prototype.onRun = function () {
        var _this = this;
        this.app.listen(this.port, function (error) {
            if (error) {
                return console.error('Error al levantar servidor =====> ', error);
            }
            console.log('Corriendo en puerto', _this.port);
        });
        this.onLoadPublic();
    };
    server.prototype.onLoadPublic = function () {
        var pathPublic = path.resolve(__dirname, '../public');
        this.app.use(express.static(pathPublic));
    };
    return server;
}());
exports.default = server;
