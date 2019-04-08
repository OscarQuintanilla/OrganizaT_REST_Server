import { Request, Response } from "express";
import pool from '../database';

class GeneralController {
    public async generarId(req: Request, res: Response) {
        const { tipo } = req.params;
        var inicialesTipo: string = "";
        var result: [{ id: "" }];
        var resultU: [{ idUsuario: "" }];

        var partesId: string[];
        let elemento: string = "";
        let ultimoId: string = "";
        let id: string = "";
        let iteracion: number = 0;

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
                resultU = await pool.query(`SELECT idUsuario FROM ${elemento} ORDER BY idUsuario ASC`);
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

            } else {
                result = await pool.query(`SELECT id FROM ${elemento} ORDER BY id ASC`);
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
            } else if (+ultimoId > 9 && +ultimoId < 100) {
                id = inicialesTipo + "000000" + ultimoId.toString();
            } else if (+ultimoId > 99 && +ultimoId > 1000) {
                id = inicialesTipo + "00000" + ultimoId.toString();
            } else if (+ultimoId > 999 && +ultimoId > 10000) {
                id = inicialesTipo + "0000" + ultimoId.toString();
            } else if (+ultimoId > 9999 && +ultimoId > 100000) {
                id = inicialesTipo + "000" + ultimoId.toString();
            } else if (+ultimoId > 99999 && +ultimoId > 1000000) {
                id = inicialesTipo + "00" + ultimoId.toString();
            } else if (+ultimoId > 999999 && +ultimoId > 10000000) {
                id = inicialesTipo + "0" + ultimoId.toString();
            } else if (+ultimoId > 9999999 && +ultimoId > 100000000) {
                id = inicialesTipo + "" + ultimoId.toString();
            } else {
                id = "ERROR AL GENERAR CEROS. REVISAR FUNCIÓN.";
            }
            console.log(id);
            //Respuesta con procedimiento correcto
            res.json({ "id": id });

        } catch (error) {
            console.log(error);
        }
    }
}

const generalController = new GeneralController();
export default generalController;
