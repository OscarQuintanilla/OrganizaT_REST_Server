import { Request, Response } from "express";
import pool from '../database';

class GeneralController {
    public async generarId(req: Request, res: Response) {
        const { tipo } = req.params;
        var result: string[];
        var partesId;
        var ultimoId: number;
        try {
            switch (tipo) {
                case "evaluacion":
                    result = await pool.query("SELECT id FROM tareas ORDER BY id ASC");
                    //lista = result[1]
                    res.json(result[2]);
                    break;
                case "grupo":
                    result = await pool.query("SELECT id FROM tareas ORDER BY id ASC");
                    res.json(result);
                    break;
                case "materia":
                    result = await pool.query("SELECT id FROM tareas ORDER BY id ASC");
                    res.json(result);
                    break;
                case "pefil":
                    result = await pool.query("SELECT id FROM tareas ORDER BY id ASC");
                    res.json(result);
                    break;
                case "tarea":
                    let tipo: string = "TA";

                    




                    res.json({ "id": this.asignarCeros(tipo, idAsignado) });
                    break;

                default:

                    break;
            }


        } catch (error) {
            console.log(error);
        }

    }
    /**
     * 
     * @param tipoElemento String con las iniciales de ID asignadas al Elemento (Tarea, Evaluación, etc.).
     * @param ultimoId Número asignado para colocarse al final del correlativo para ID.
     */

    private asignarCeros(tipoElemento: string, ultimoId: number): string {
        let id: string = "";

        if (ultimoId < 10) {
            id = tipoElemento + "0000000" + ultimoId.toString();
            console.log(tipoElemento);
        } else if (ultimoId > 9 && ultimoId < 100) {
            id = tipoElemento + "000000" + ultimoId.toString();
            console.log(tipoElemento);
        }
        return id;
    }

    private async asignarNumCorrelativo(elemento: string, req: Request, res: Response): Promise<number> {
        let iteracion: number = 0;
        let ultimoId: number = 0;
        let idAsignado: number = 0;
        var result: string[];
        var partesId;

        result = await pool.query(`SELECT id FROM ${elemento} ORDER BY id ASC`);

        //Tambien encuentra saltos en la continuidad de tareas
        result.forEach(tipoElemento => {
            iteracion++;
            partesId = tipoElemento.id.split(/[A]/);
            let cantPartes = partesId.length
            if (partesId[cantPartes - 1] == iteracion) {
                ultimoId = partesId[cantPartes - 1];
            }
        });
        idAsignado = +ultimoId + 1;

        return idAsignado;
    }

}
const generalController = new GeneralController();
export default generalController;