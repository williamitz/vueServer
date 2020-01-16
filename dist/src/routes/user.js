"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var server_1 = __importDefault(require("../classes/server"));
var router = express_1.Router();
router.post('/login', function (req, res) {
    var body = req.body;
    var sqlMysql = "\n        SELECT * FROM users WHERE user = '" + body.user + "' AND password = '" + body.password + "';\n    ";
    console.log(body);
    server_1.default.onExecuteQuery(sqlMysql, function (err, data) {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: 'Error de conexión'
            });
        }
        res.json({
            ok: true,
            data: data,
            message: 'bienvenido'
        });
    });
});
router.get('/getUsers', function (req, res) {
    var sqlMysql = "\n        SELECT * FROM users ;\n    ";
    server_1.default.onExecuteQuery(sqlMysql, function (err, data) {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: "Error de conexión"
            });
        }
        res.json({
            ok: true,
            data: data,
            message: "usuarios"
        });
    });
});
exports.default = router;
