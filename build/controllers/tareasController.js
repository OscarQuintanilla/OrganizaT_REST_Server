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
class TareasController {
    listarTareas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario } = req.body;
            try {
                const result = yield database_1.default.query("SELECT * FROM tareas WHERE idUsuario = ? ORDER BY FechaEntrega ASC", [idUsuario]);
                res.json(result);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    buscarTarea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { idUsuario } = req.body;
                const result = yield database_1.default.query("SELECT * FROM tareas WHERE id = ? AND idUsuario = ?", [id, idUsuario]);
                res.json(result);
            }
            catch (error) {
                console.log("Ocurrió un error en la consulta.");
            }
        });
    }
    listarTareasSemana(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield database_1.default.query("SELECT * FROM tareas WHERE idUsuario = 'MASTER' AND DATEDIFF(FechaEntrega, CURDATE()) < 8");
                res.json(resultado);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    crearTarea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Crea el registro en la tabla tareas   
                yield database_1.default.query('INSERT INTO tareas SET ?', [req.body]);
                //await pool.query('SELECT * FROM tareas');
                res.json({ message: 'Insertado' });
                console.log("Tarea insertada.");
            }
            catch (error) {
                console.log("No se pudo insertar la tarea.");
                res.json({ message: error });
            }
        });
    }
    modificarTarea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                yield database_1.default.query("UPDATE tareas SET ? WHERE id = ?", [req.body, id]);
                res.json({ message: "Tarea actualizada." });
            }
            catch (error) {
                console.log("No se pudo actualizar la tarea. Mensaje: " + error);
            }
            res.json({ text: 'Modificando ' + req.params.id });
        });
    }
    eliminarTarea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { idUsuario } = req.body;
            console.log(idUsuario);
            yield database_1.default.query('DELETE FROM tareas WHERE id = ? AND idUsuario = ?', [id, idUsuario]);
            res.json({ message: "Tarea eliminada. " + id });
        });
    }
}
const tareasController = new TareasController();
exports.default = tareasController;
