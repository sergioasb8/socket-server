

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    // acá van todos los eventos de nuestra comunicación de sockets
    socketEvents() {

        // On connection
        this.io.on('connection', ( socket ) => {

            // listen the event: message-to-server
            socket.on('message-to-server', (data) => {
                console.log(data);
                this.io.emit('message-from-server', data);
            })
        });
    }
}

module.exports = Sockets;