"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var mysql_1 = __importDefault(require("mysql"));
var path_1 = __importDefault(require("path"));
var server = /** @class */ (function () {
    function server(port) {
        this.app = express_1.default();
        this.httpServer = http_1.default.createServer(this.app);
        this.port = port;
        this.connectDB = mysql_1.default.createConnection({
            port: 3307,
            host: "localhost",
            user: "root",
            password: "",
            database: "globalpanel"
        });
    }
    Object.defineProperty(server, "instance", {
        get: function () {
            return this._instance || (this._instance = new this(3000));
        },
        enumerable: true,
        configurable: true
    });
    server.prototype.onRun = function (callback) {
        this.httpServer.listen(this.port, callback());
        var pathPublic = path_1.default.resolve(__dirname, '../public');
        this.app.use(express_1.default.static(pathPublic));
    };
    server.prototype.onConnectDB = function (host, user, password, database) {
        if (host === void 0) { host = 'localhost'; }
        if (user === void 0) { user = 'root'; }
        if (password === void 0) { password = ''; }
        if (database === void 0) { database = 'panelglobal'; }
        this.connectDB = mysql_1.default.createConnection({
            port: 3307,
            host: host,
            user: user,
            password: password,
            database: database
        });
        this.connectDB.connect(function (error) {
            if (error) {
                return console.log('Error de conexión con la base de datos: ', error);
            }
            console.log('Conectado con base de datos');
        });
    };
    server.onExecuteQuery = function (sqlMysql, callback) {
        if (sqlMysql === void 0) { sqlMysql = ''; }
        this.instance.connectDB.query(sqlMysql, function (error, results, fields) {
            if (error) {
                console.log('Error en query', sqlMysql, error);
                return callback(error);
            }
            callback(null, results);
        });
    };
    return server;
}());
exports.default = server;
