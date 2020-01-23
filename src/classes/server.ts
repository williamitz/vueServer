import express = require('express');
import http = require('http') ;
// import mysql = require('mysql') ;
import path = require('path') ;

export default class server {

    public app: express.Application;
    // public httpServer: http.Server;

    public port: number;

    // private connectDB: mysql.Connection;

    static _instance: server;

    constructor(port: number) {

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

    public static get instance() {
        return this._instance || ( this._instance = new this(3000) );
    }

    onRun() {
        this.app.listen(this.port, (error: any) => {
            if (error) {
                return console.error('Error al levantar servidor =====> ', error);
            }
            console.log('Corriendo en puerto', this.port);
        } );

        this.onLoadPublic();
        
    }

    onLoadPublic() {
        let pathPublic = path.resolve(__dirname, '../public');
        this.app.use(express.static(pathPublic));
    }

    // onConnectDB( host = 'localhost', user = 'root', password = '', database = 'panelglobal' ) {
    //     this.connectDB = mysql.createConnection({
    //       port: 3307,
    //       host,
    //       user,
    //       password,
    //       database
    //     });

    //     this.connectDB.connect( (error) => {
    //         if( error ) {
    //             return console.log('Error de conexión con la base de datos: ', error);
    //         }

    //         console.log('Conectado con base de datos');
    //     } );
    // }

    // static onExecuteQuery( sqlMysql = '', callback: Function ) {
    //     this.instance.connectDB.query( sqlMysql, ( error: any, results: Object[], fields ) => {
    //         if( error ) {
    //             console.log('Error en query', sqlMysql, error);
    //             return callback( error, [] );
    //         }

    //         callback( null, results );
    //     });
    // }
}