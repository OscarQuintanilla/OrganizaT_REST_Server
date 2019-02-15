"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const materiasController_1 = __importDefault(require("../controllers/materiasController"));
class MateriasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', materiasController_1.default.listarMaterias);
        this.router.get('/:id', materiasController_1.default.buscarMateriaPorID);
        this.router.post('/', materiasController_1.default.crearMateria);
        this.router.put('/:id', materiasController_1.default.modificarMateria);
        this.router.delete('/:id', materiasController_1.default.eliminarMateria);
    }
}
const materiasRoutes = new MateriasRoutes();
exports.default = materiasRoutes.router;
