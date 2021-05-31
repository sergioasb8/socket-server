// Express server
const express   = require('express');
const http      = require('http');
const socketio  = require('socket.io');
const path      = require('path');
const Sockets   = require('./sockets');


class Server {

    // acá definimos las propiedades que va a tener el server
    // global config
    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        // http server
        this.server = http.createServer( this.app );

        // sockets config
        this.io = socketio( this.server, {/** espacio para config sel socket */});
    }

    middlewares() {
        // Display the public directory 
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
    }

    configSockets() {
        new Sockets( this.io );
    }

    execute() {

        // Inicializar middlewares
        this.middlewares();

        // Inicializar Sockets
        this.configSockets();

        // Inicializar el server
        this.server.listen( this.port, () => {
            console.log('Server on port: ', this.port);
        });
    }

}

module.exports = Server;