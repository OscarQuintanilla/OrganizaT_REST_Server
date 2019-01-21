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
class GeneralController {
    /**
     *
     */
    generarId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tipo } = req.params;
            var result;
            var partesId;
            var ultimoId;
            try {
                switch (tipo) {
                    case "evaluacion":
                        result = yield database_1.default.query("SELECT id FROM tareas ORDER BY id ASC");
                        //lista = result[1]
                        res.json(result[2]);
                        break;
                    case "grupo":
                        result = yield database_1.default.query("SELECT id FROM tareas ORDER BY id ASC");
                        res.json(result);
                        break;
                    case "materia":
                        result = yield database_1.default.query("SELECT id FROM tareas ORDER BY id ASC");
                        res.json(result);
                        break;
                    case "pefil":
                        result = yield database_1.default.query("SELECT id FROM tareas ORDER BY id ASC");
                        res.json(result);
                        break;
                    case "tarea":
                        result = yield database_1.default.query("SELECT id FROM tareas ORDER BY id ASC");
                        result.forEach(tarea => {
                            partesId = tarea.id.split(/['TA' '0']/);
                            let cantPartes = partesId.length;
                            ultimoId = partesId[cantPartes - 1];
                        });
                        console.log(ultimoId);
                        res.json(result[2]);
                        break;
                    default:
                        break;
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    asignarCeros() {
    }
}
const generalController = new GeneralController();
exports.default = generalController;
