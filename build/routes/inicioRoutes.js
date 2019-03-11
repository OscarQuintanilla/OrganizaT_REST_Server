"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inicioController_1 = __importDefault(require("../controllers/inicioController"));
class InicioRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', inicioController_1.default.obtenerTareasSemana);
    }
}
const inicioRoutes = new InicioRoutes();
exports.default = inicioRoutes.router;
