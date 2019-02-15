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
class ControllerServices {
    constructor() {
    }
    /**
    * @param tipoElemento String con las iniciales de ID asignadas al Elemento (Tarea, Evaluación, etc.).
    * @param ultimoId Número asignado para colocarse al final del correlativo.
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
        else if (ultimoId > 99 && ultimoId > 1000) {
            id = tipoElemento + "00000" + ultimoId.toString();
            console.log(tipoElemento);
        }
        else if (ultimoId > 999 && ultimoId > 10000) {
            id = tipoElemento + "0000" + ultimoId.toString();
            console.log(tipoElemento);
        }
        else if (ultimoId > 9999 && ultimoId > 100000) {
            id = tipoElemento + "000" + ultimoId.toString();
            console.log(tipoElemento);
        }
        else if (ultimoId > 99999 && ultimoId > 1000000) {
            id = tipoElemento + "00" + ultimoId.toString();
            console.log(tipoElemento);
        }
        else if (ultimoId > 999999 && ultimoId > 10000000) {
            id = tipoElemento + "0" + ultimoId.toString();
            console.log(tipoElemento);
        }
        else if (ultimoId > 9999999 && ultimoId > 100000000) {
            id = tipoElemento + "" + ultimoId.toString();
            console.log(tipoElemento);
        }
        else {
            id = "ERROR AL GENERAR CEROS. REVISAR FUNCIÓN.";
            console.log(id);
        }
        return id;
    }
    /**
     *
     * @param elemento Tipo de elemento al que se le generará el ID
     */
    asignarNumCorrelativo(elemento) {
        return __awaiter(this, void 0, void 0, function* () {
            let iteracion = 0;
            let ultimoId = 0;
            let idAsignado = 0;
            let result;
            var partesId;
            try {
                result = yield database_1.default.query(`SELECT id FROM ${elemento} ORDER BY id ASC`);
                console.log(result.length);
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
            }
            catch (error) {
                console.log(error);
                return 0;
            }
        });
    }
}
exports.ControllerServices = ControllerServices;
