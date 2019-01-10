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
        //res.send('Games.')
        database_1.default.query('DESCRIBE tareas');
        res.json('tareas');
    }
    buscarTarea(req, res) {
        res.json({ text: 'Buscando ' + req.params.id });
    }
    crearTarea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('INSERT INTO tareas SET ?', [req.body]);
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
        res.json({ text: 'Modificando ' + req.params.id });
    }
    eliminarTarea(req, res) {
        res.json({ text: 'Eliminando ' + req.params.id });
    }
}
const tareasController = new TareasController();
exports.default = tareasController;
