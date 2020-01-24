import express = require('express');
import http = require('http') ;
import path = require('path') ;

export default class server {

    public app: express.Application;
    // public httpServer: http.Server;

    public port: number;

    static _instance: server;

    constructor(port: number) {

        this.app = express();
        // this.httpServer = http.createServer( this.app );

        this.port = port;

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


}