"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Mysql = require("../classes/mysql");
var MysqlDB = Mysql.default.instance;
var router = express_1.Router();
router.post('/User/Add', function (req, res) {
    var body = req.body; //JSON.stringify(req.body) ;
    // let newBody = JSON.parse(body);
    var sqlQuery = "CALL ss_addUer( \"" + body.nameUser + "\", \"" + body.passwordUser + "\" );";
    MysqlDB.onExecuteQuery(sqlQuery, function (err, data) {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: "Error de conexión"
            });
        }
        res.json({
            ok: true,
            data: data,
            message: "Se registro con éxito"
        });
    });
});
router.get('/User/Get', function (req, res) {
    var body = req.body; //JSON.stringify(req.body) ;
    // let newBody = JSON.parse(body);
    var sqlQuery = "CALL ss_getUser( );";
    MysqlDB.onExecuteQuery(sqlQuery, function (err, data) {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: "Error de conexión"
            });
        }
        res.json({
            ok: true,
            data: data,
            message: "Lista de usuarios"
        });
    });
});
exports.default = router;
