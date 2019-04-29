"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gruposController_1 = __importDefault(require("../controllers/gruposController"));
class GruposRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/lista', gruposController_1.default.listarGrupos);
        this.router.post('/:id', gruposController_1.default.obtenerGrupoPorId);
        this.router.post('/crear/crear', gruposController_1.default.crearGrupo);
        this.router.put('/:id', gruposController_1.default.modificarGrupo);
        this.router.post('/fin/:id', gruposController_1.default.eliminiarGrupo);
    }
}
const gruposRoutes = new GruposRoutes();
exports.default = gruposRoutes.router;
