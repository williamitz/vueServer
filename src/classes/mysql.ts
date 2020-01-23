import mysql = require('mysql');


export default class Mysql {

    private connectDB: mysql.Connection;

    private static _instance: Mysql;

    constructor() {
        this.connectDB = mysql.createConnection({
            port: 3307,
            host: "localhost",
            user: "root",
            password: "",
            database: "panelglobal"
        });
        this.onConnect();
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }
    
    private onConnect() {
        this.connectDB.connect( (error) => {
            
            if (error ) {
                console.error("Error de conexión con base de datos ===> ", error);                
            }
            
            console.log("Conectado con base de datos");
            
        });
    }

    static onNewConnection(port = 3307, host = 'localhost', user = 'root', password = '', database = 'panelglobal') {
        this.instance.connectDB = mysql.createConnection({
            port,
            host,
            user,
            password,
            database
        });

        this.instance.onConnect();
    }

    onExecuteQuery( sql: string, callback: Function ) {

        this.connectDB.query( sql, ( error: any, result: Object[], fields: any ) => {
            if( error ) {
                console.error('Error al procesar query ===> ', sql);
                console.error(error);
                return callback( error , [] );                
            }

            return callback( null,  result );
        })
    }
}