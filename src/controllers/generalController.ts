import { Request, Response } from "express";
import pool from '../database';

class GeneralController {

    /**
     * 
     */

    public async generarId(req: Request, res: Response) {
        const { tipo } = req.params;
        var result: string[];
        var partesId;
        var ultimoId:number;
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
                    result = await pool.query("SELECT id FROM tareas ORDER BY id ASC");
                    result.forEach(tarea => {
                        partesId = tarea.id.split(/['TA' '0']/);
                        let cantPartes = partesId.length
                        ultimoId = partesId[cantPartes - 1];                   
                    });
                    console.log(ultimoId);

                    res.json(result[2]);
                    break;

                default:

                    break;
            }


        } catch (error) {
            console.log(error);
        }

    }

    private asignarCeros(){

    }
}
const generalController = new GeneralController();
export default generalController;