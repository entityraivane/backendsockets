"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const server_1 = __importDefault(require("../classes/server"));
exports.router = (0, express_1.Router)();
exports.router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Mensaje del get'
    });
});
exports.router.post('/mensajes', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const payload = {
        cuerpo,
        de
    };
    const server = server_1.default.instance;
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        mensaje: 'Mensaje de post',
        cuerpo,
        de
    });
});
exports.router.post('/mensajes/:id', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    const payload = {
        de,
        cuerpo
    };
    const server = server_1.default.instance;
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        mensaje: 'Mensaje de post',
        cuerpo,
        de,
        id
    });
});
exports.default = exports.router;
