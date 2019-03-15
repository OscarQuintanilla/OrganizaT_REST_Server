"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sesionController_1 = __importDefault(require("../controllers/sesionController"));
class SesionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', sesionController_1.default.verificarDatos);
        this.router.post('/registrar', sesionController_1.default.crearCuenta);
        this.router.put('/', sesionController_1.default.actualizarDatos);
        this.router.delete('/:idUsuario', sesionController_1.default.borrarCuenta);
    }
}
const sesionRoutes = new SesionRoutes();
exports.default = sesionRoutes.router;
