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
                        let tipo = "TA";
                        res.json({ "id": this.asignarCeros(tipo, idAsignado) });
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
    /**
     *
     * @param tipoElemento String con las iniciales de ID asignadas al Elemento (Tarea, Evaluación, etc.).
     * @param ultimoId Número asignado para colocarse al final del correlativo para ID.
     */
    asignarCeros(tipoElemento, ultimoId) {
        let id = "";
        if (ultimoId < 10) {
            id = tipoElemento + "0000000" + ultimoId.toString();
            console.log(tipoElemento);
        }
        else if (ultimoId > 9 && ultimoId < 100) {
            id = tipoElemento + "000000" + ultimoId.toString();
            console.log(tipoElemento);
        }
        return id;
    }
    asignarNumCorrelativo(elemento, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let iteracion = 0;
            let ultimoId = 0;
            let idAsignado = 0;
            var result;
            var partesId;
            result = yield database_1.default.query(`SELECT id FROM ${elemento} ORDER BY id ASC`);
            //Tambien encuentra saltos en la continuidad de tareas
            result.forEach(tipoElemento => {
                iteracion++;
                partesId = tipoElemento.id.split(/[A]/);
                let cantPartes = partesId.length;
                if (partesId[cantPartes - 1] == iteracion) {
                    ultimoId = partesId[cantPartes - 1];
                }
            });
            idAsignado = +ultimoId + 1;
            return idAsignado;
        });
    }
}
const generalController = new GeneralController();
exports.default = generalController;
