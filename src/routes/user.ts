import {Router, Response, Request} from 'express';
import Mysql = require('../classes/mysql');

const MysqlDB = Mysql.default.instance;

const router = Router();


router.post('/User/Add', (req: Request, res: Response) => {
  let body = req.body; //JSON.stringify(req.body) ;
  // let newBody = JSON.parse(body);

  let sqlQuery = `CALL ss_addUer( "${body.nameUser}", "${body.passwordUser }" );`

  MysqlDB.onExecuteQuery( sqlQuery, (err: any, data: Object) => {
    if (err) {

      return res.status(500).json({
        ok: false,
        error: "Error de conexión"
      });
    }

    res.json({
      ok: true,
      data,
      message: "Se registro con éxito"
    });
  });

});

router.get('/User/Get', (req: Request, res: Response) => {
  let body = req.body; //JSON.stringify(req.body) ;
  // let newBody = JSON.parse(body);

  let sqlQuery = `CALL ss_getUser( );`

  MysqlDB.onExecuteQuery(sqlQuery, (err: any, data: Object) => {
    if (err) {

      return res.status(500).json({
        ok: false,
        error: "Error de conexión"
      });
    }

    res.json({
      ok: true,
      data,
      message: "Lista de usuarios"
    });
  });

});


export default router;