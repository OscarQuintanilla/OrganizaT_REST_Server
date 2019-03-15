"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class SesionController {
    verificarDatos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Correo } = req.body;
            const { NombreLogin } = req.body;
            const { Clave } = req.body;
            console.log(req.body);
            const respuesta = yield database_1.default.query("SELECT * FROM usuario WHERE (Correo = ? AND Clave = ? ) OR (NombreLogin = ? AND Clave = ?) ", [Correo, Clave, NombreLogin, Clave]);
            res.json(respuesta);
        });
    }
    actualizarDatos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario } = req.body;
            const respuesta = yield database_1.default.query("UPDATE usuario  SET ? WHERE idUsuario = ?", [req.body, idUsuario]);
            res.json(respuesta);
        });
    }
    crearCuenta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query("INSERT INTO usuario SET ?", [req.body]);
            res.json(respuesta);
        });
    }
    borrarCuenta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario } = req.params;
            const respuesta = yield database_1.default.query("DELETE FROM usuario WHERE idUsuario = ?", [idUsuario]);
            res.json(respuesta);
        });
    }
}
const sesionController = new SesionController();
exports.default = sesionController;
