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
class MateriasController {
    listarMaterias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idUsuario } = req.body;
                const resultado = yield database_1.default.query("SELECT * FROM materias WHERE idUsuario = ?", [idUsuario]);
                res.json(resultado);
            }
            catch (error) {
                console.log("Consulta de listar no exitosa: " + error);
            }
        });
    }
    buscarMateriaPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { idUsuario } = req.body[0];
                const { id } = req.params;
                const resultado = yield database_1.default.query('SELECT * FROM materias WHERE id = ? AND idUsuario = ?', [id, idUsuario]);
                if (resultado[0].idUsuario != idUsuario) {
                    resultado == null;
                    res.json({ "error": "sin permiso" });
                }
                else {
                    res.json(resultado);
                }
            }
            catch (error) {
                console.log("No se pudo encontrar: " + error);
            }
        });
    }
    crearMateria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('INSERT INTO materias SET ?', [req.body]);
                res.json({ "Éxito": "Materia registrada con éxito" });
            }
            catch (error) {
                res.json({ "Error": "Error al registrar materia: " + error });
            }
        });
    }
    modificarMateria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.default.query('UPDATE materias SET ? WHERE id = ?', [req.body, id]);
                res.json({ "Éxito": "Materia modificada exitosamente." });
            }
            catch (error) {
                res.json({ "Error": "Error al modificar materia: " + error });
            }
        });
    }
    eliminarMateria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { idUsuario } = req.body;
                yield database_1.default.query('DELETE FROM materias WHERE id = ? AND idUsuario = ?', [id, idUsuario]);
                res.json({ "Éxito": "Materia eliminada exitosamente." });
            }
            catch (error) {
                res.json({ "Error": "Error al eliminar materia: " + error });
            }
        });
    }
}
const materiasController = new MateriasController();
exports.default = materiasController;
