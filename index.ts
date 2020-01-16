import server from "./src/classes/server";
import cors from 'cors';
import route from './src/routes/route';
import bodyParser from "body-parser";

const Server = server.instance;

// parse application/x-www-form-urlencoded
Server.app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
Server.app.use(bodyParser.json());

Server.app.use( cors( { origin: true, credentials: true } ) );

Server.app.use(route);

Server.onRun( (error: any) => {
    if ( error ) {
        return console.log('error al levantar servidor');
    }
    console.log('Corriendo en puerto', Server.port);
} );

Server.onConnectDB('localhost','root','','panelglobal');