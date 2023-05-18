import { Request, Response, Router } from "express";
import Server from "../classes/server";
import { usuariosConectados } from "../sockets/socket";

export const router = Router()
router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'Mensaje del get'
    })
})
router.post('/mensajes', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo
    const de = req.body.de
    const payload = {
        cuerpo,
        de
    }
    const server = Server.instance
    server.io.emit('mensaje-nuevo', payload)

    res.json({
        ok: true,
        mensaje: 'Mensaje de post',
        cuerpo,
        de
    })
})
router.post('/mensajes/:id', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo
    const de = req.body.de
    const id = req.params.id
    const payload = {
        de,
        cuerpo
    }
    const server = Server.instance
    server.io.in(id).emit('mensaje-privado', payload)

    res.json({
        ok: true,
        mensaje: 'Mensaje de post',
        cuerpo,
        de,
        id
    })
})
router.get('/usuarios', (req: Request, res: Response) => {
    const server = Server.instance;
    const clients = server.io.sockets.sockets;
    const socketIds = Array.from(clients.keys()); // Obtener los identificadores de socket
    console.log(socketIds)
    res.json({
        ok: true,
        clients: socketIds
    })
})
router.get('/usuarios/detalle', (req: Request, res: Response) => {
    res.json({
        ok:true,
        clientes:usuariosConectados.getLista()
    })
    usuariosConectados
})
export default router