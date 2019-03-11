"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class InicioController {
    obtenerTareasSemana(req, res) {
        try {
            var fecha = new Date();
            console.log(fecha);
            fecha = fecha.getFullYear() + "-" + (+fecha.getMonth() + 1) + "-" + fecha.getDate();
            console.log(fecha);
            var consulta = "SELECT * FROM tareas WHERE idUsuario = 'MASTER' AND DATEDIFF(FechaEntrega, " + fecha + ") < 8";
            console.log(consulta);
            const respuesta = database_1.default.query(consulta);
            res.json(respuesta);
        }
        catch (error) {
            console.error(error);
        }
    }
}
const inicioController = new InicioController();
exports.default = inicioController;
