"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const evaluacionesController_1 = __importDefault(require("../controllers/evaluacionesController"));
class EvaluacionesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/lista', evaluacionesController_1.default.listarEvaluaciones);
        this.router.post('/:id', evaluacionesController_1.default.obtenerEvaluacionPorId);
        this.router.post('/', evaluacionesController_1.default.crearEvaluacion);
        this.router.put('/:id', evaluacionesController_1.default.modificarEvaluacion);
        this.router.post('/fin/:id', evaluacionesController_1.default.eliminarEvaluacion);
    }
}
const evaluacionesRoutes = new EvaluacionesRoutes();
exports.default = evaluacionesRoutes.router;
