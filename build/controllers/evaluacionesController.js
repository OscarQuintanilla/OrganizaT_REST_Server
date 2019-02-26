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
class EvaluacionesController {
    listarEvaluaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield database_1.default.query("SELECT * FROM evaluaciones WHERE idUsuario = 'MASTER'");
                res.json(resultado);
            }
            catch (error) {
                res.json({ "error": error });
                console.log("Error al listar: " + error);
            }
        });
    }
    obtenerEvaluacionPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const resultado = yield database_1.default.query("SELECT * FROM evaluaciones WHERE idUsuario = 'MASTER' AND  id = ? ", [id]);
                res.json(resultado);
            }
            catch (error) {
                res.json({ "error": error });
                console.log("Error al listar: " + error);
            }
        });
    }
    crearEvaluacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield database_1.default.query("INSERT INTO evaluaciones SET ?", [req.body]);
                res.json({ "resultado": "exito" });
            }
            catch (error) {
                res.json({ "error": error });
                console.log("Error al listar: " + error);
            }
        });
    }
    modificarEvaluacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const resultado = yield database_1.default.query("UPDATE evaluaciones SET ? WHERE id = ?", [req.body, id]);
                res.json({ "resultado": "exito" });
            }
            catch (error) {
                res.json({ "error": error });
                console.log("Error al listar: " + error);
            }
        });
    }
    /**
     * eliminarEvaluacion Elimina un registro en la tabla evaluaciones indicado por su id
     */
    eliminarEvaluacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const resultado = yield database_1.default.query("DELETE FROM evaluaciones WHERE id = ?", [id]);
                res.json({ "resultado": "exito" });
            }
            catch (error) {
                res.json({ "error": error });
                console.log("Error al listar: " + error);
            }
        });
    }
}
exports.EvaluacionesController = EvaluacionesController;
const evaluacionesController = new EvaluacionesController();
exports.default = evaluacionesController;
