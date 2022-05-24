const express = require('express');
const cors = require('cors');
const fileupload = require('express-fileupload');
const { dbConnection } = require('../database/config');
require('dotenv').config();

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            uploads: '/api/uploads'
        }

        //Conectar a la base de datos
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();

        //Sockets
        this.sockets();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());
        //Parseo y lectura del body
        this.app.use(express.json());
        //Directorio público
        this.app.use(express.static('public'));
        //Fileupload - Carga de archivos
        this.app.use(fileupload({
            useTempFiles: true,
            tempFileDir: '/tmp',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.users, require('../routes/users'));
    }

    sockets() {
        //this.io.on('connection', (socket) => socketController(socket, this.io));
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Server running at port', this.port);
        });
    }
};

module.exports = Server;