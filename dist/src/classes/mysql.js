"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var Mysql = /** @class */ (function () {
    function Mysql() {
        this.connectDB = mysql.createConnection({
            port: 3307,
            host: "localhost",
            user: "root",
            password: "",
            database: "panelglobal"
        });
        this.onConnect();
    }
    Object.defineProperty(Mysql, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    Mysql.prototype.onConnect = function () {
        this.connectDB.connect(function (error) {
            if (error) {
                console.error("Error de conexión con base de datos ===> ", error);
            }
            console.log("Conectado con base de datos");
        });
    };
    Mysql.onNewConnection = function (port, host, user, password, database) {
        if (port === void 0) { port = 3307; }
        if (host === void 0) { host = 'localhost'; }
        if (user === void 0) { user = 'root'; }
        if (password === void 0) { password = ''; }
        if (database === void 0) { database = 'panelglobal'; }
        this.instance.connectDB = mysql.createConnection({
            port: port,
            host: host,
            user: user,
            password: password,
            database: database
        });
        this.instance.onConnect();
    };
    Mysql.prototype.onExecuteQuery = function (sql, callback) {
        this.connectDB.query(sql, function (error, result, fields) {
            if (error) {
                console.error('Error al procesar query ===> ', sql);
                console.error(error);
                return callback(error, []);
            }
            return callback(null, result);
        });
    };
    return Mysql;
}());
exports.default = Mysql;
