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
            var inicialesTipo = "";
            var result;
            var resultU;
            var partesId;
            let elemento = "";
            let ultimoId = "";
            let id = "";
            let iteracion = 0;
            try {
                switch (tipo) {
                    case "evaluacion":
                        elemento = "evaluaciones";
                        inicialesTipo = "EV";
                        break;
                    case "grupo":
                        elemento = "gruposdetrabajo";
                        inicialesTipo = "GR";
                        break;
                    case "materia":
                        elemento = "materias";
                        inicialesTipo = "MA";
                        break;
                    case "perfil":
                        elemento = "usuario";
                        inicialesTipo = "US";
                        break;
                    case "tarea":
                        elemento = "tareas";
                        inicialesTipo = "TA";
                        break;
                    default:
                        console.log("Vulneración del sistema.");
                        break;
                }
                if (elemento == 'usuario') {
                    resultU = yield database_1.default.query(`SELECT idUsuario FROM ${elemento} ORDER BY idUsuario ASC`);
                    //Se recorre el registro para guardar la sección numerica del registro hasta llegar a la última
                    //También encuentra saltos en la continuidad
                    resultU.forEach(registro => {
                        iteracion++;
                        //Parte según la última letra del tipo de usuario
                        partesId = registro.idUsuario.split(/[A V R S]/);
                        let cantPartes = partesId.length;
                        if (+partesId[cantPartes - 1] == iteracion) {
                            ultimoId = partesId[cantPartes - 1];
                        }
                    });
                }
                else {
                    result = yield database_1.default.query(`SELECT id FROM ${elemento} ORDER BY id ASC`);
                    result.forEach(registro => {
                        if (registro.id == undefined) {
                            registro.id = resultU[0].idUsuario;
                        }
                        iteracion++;
                        //Parte según la última letra del tipo de usuario
                        partesId = registro.id.split(/[A V R S]/);
                        let cantPartes = partesId.length;
                        if (+partesId[cantPartes - 1] == iteracion) {
                            ultimoId = partesId[cantPartes - 1];
                        }
                    });
                }
                //Asigna el correlativo adicionando uno al último
                ultimoId = (+ultimoId + 1).toString();
                //Asignación de ceros
                if (+ultimoId < 10) {
                    id = inicialesTipo + "0000000" + ultimoId.toString();
                }
                else if (+ultimoId > 9 && +ultimoId < 100) {
                    id = inicialesTipo + "000000" + ultimoId.toString();
                }
                else if (+ultimoId > 99 && +ultimoId > 1000) {
                    id = inicialesTipo + "00000" + ultimoId.toString();
                }
                else if (+ultimoId > 999 && +ultimoId > 10000) {
                    id = inicialesTipo + "0000" + ultimoId.toString();
                }
                else if (+ultimoId > 9999 && +ultimoId > 100000) {
                    id = inicialesTipo + "000" + ultimoId.toString();
                }
                else if (+ultimoId > 99999 && +ultimoId > 1000000) {
                    id = inicialesTipo + "00" + ultimoId.toString();
                }
                else if (+ultimoId > 999999 && +ultimoId > 10000000) {
                    id = inicialesTipo + "0" + ultimoId.toString();
                }
                else if (+ultimoId > 9999999 && +ultimoId > 100000000) {
                    id = inicialesTipo + "" + ultimoId.toString();
                }
                else {
                    id = "ERROR AL GENERAR CEROS. REVISAR FUNCIÓN.";
                }
                console.log(id);
                //Respuesta con procedimiento correcto
                res.json({ "id": id });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
const generalController = new GeneralController();
exports.default = generalController;
