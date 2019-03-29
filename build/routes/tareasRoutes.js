"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tareasController_1 = __importDefault(require("../controllers/tareasController"));
class TareasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/lista/', tareasController_1.default.listarTareas);
        this.router.post('/:id', tareasController_1.default.buscarTarea);
        this.router.post('/', tareasController_1.default.crearTarea);
        this.router.put('/:id', tareasController_1.default.modificarTarea);
        this.router.post('/fin/:id', tareasController_1.default.eliminarTarea);
    }
}
const tareasRoutes = new TareasRoutes();
exports.default = tareasRoutes.router;
