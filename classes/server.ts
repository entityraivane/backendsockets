import express from 'express'
import { SERVER_PORT } from '../global/enviroment'
import socketIO from 'socket.io'
import http from 'http'
import * as socket from '../sockets/socket'
export default class Server {
    private static _instance: Server
    public app: express.Application
    public port: number
    public io: socketIO.Server
    public httpServer: http.Server

    private constructor() {
        this.app = express()
        this.port = SERVER_PORT
        this.httpServer = new http.Server(this.app)
        this.io = new socketIO.Server(this.httpServer, {
            cors: {
                origin: 'http://localhost:4200',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                allowedHeaders: ['Content-Type'],
                credentials: true
            }
        })
        this.escucharSockets()
    }
    private escucharSockets() {
        console.log('escuchando conexiones -sockets')
        this.io.on('connection', cliente => {
           // console.log(cliente.id)
           socket.coneectarCliente(cliente,this.io)  
           socket.configirarUsuario(cliente, this.io)
            socket.obtenerUsuarios(cliente,this.io)
             console.log('cliente conectado')
            socket.mensaje(cliente, this.io)
          
            socket.desconectar(cliente,this.io)
        })
    }
    public static get instance() {
        return this._instance || (this._instance = new this())
    }
    start(callback: Function) {
        this.httpServer.listen(this.port, callback())
    }
}