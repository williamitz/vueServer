import {Router, Response, Request} from 'express';
import Server from '../classes/server';

const router = Router();

router.post( '/login', (req: Request, res: Response) => {

    let body = req.body;
    let sqlMysql = `
        SELECT * FROM users WHERE user = '${ body.user }' AND password = '${ body.password }';
    `;

  console.log(body);
    
    Server.onExecuteQuery( sqlMysql, (err: any, data: Object[]) => {
        
        if( err ) {
            return res.status(500).json({
                ok: false,
                error: 'Error de conexión'
            });
        }
    
        res.json({
            ok: true,
            data,
            message: 'bienvenido'
        });
    });


});

router.get('/getUsers', (req: Request, res: Response) => {
    let sqlMysql = `
        SELECT * FROM users ;
    `;

    Server.onExecuteQuery(sqlMysql, (err: any, data: Object[]) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          error: "Error de conexión"
        });
      }

      res.json({
        ok: true,
        data,
        message: "usuarios"
      });
    });
});

export default router;