"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioLista = void 0;
class UsuarioLista {
    constructor() {
        this.lista = [];
    }
    agregar(usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }
    actualizarNombre(id, nombre) {
        for (let usuario of this.lista) {
            if (usuario.id == id) {
                usuario.nombre = nombre;
            }
        }
        console.log('============ACTUALIZANDO USUARIO===========');
        console.log(this.lista);
    }
    getLista() {
        return this.lista;
    }
    getUsuario(id) {
        return this.lista.find(usuario => usuario.id == id);
    }
    getUsuarioEnSala(sala) {
        return this.lista.filter(usuario => usuario.sala == sala);
    }
    borrarUsuario(id) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id != id);
        console.log(this.lista);
        return tempUsuario;
    }
}
exports.UsuarioLista = UsuarioLista;
