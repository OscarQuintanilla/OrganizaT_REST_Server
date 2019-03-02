import { Request, Response } from "express";
import pool from "../database";

export class EvaluacionesController {


    public async listarEvaluaciones(req: Request, res: Response) {
        try {
            const resultado = await pool.query("SELECT * FROM evaluaciones WHERE idUsuario = 'MASTER'");
            res.json(resultado);
        } catch (error) {
            res.json({ "error": error });
            console.log("Error al listar: " + error);
        }
    }

    public async obtenerEvaluacionPorId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const resultado = await pool.query("SELECT * FROM evaluaciones WHERE idUsuario = 'MASTER' AND  id = ? ", [id]);
            res.json(resultado);
        } catch (error) {
            res.json({ "error": error });
            console.log("Error al listar: " + error);
        }
    }

    public async crearEvaluacion(req: Request, res: Response) {
        try {
            const resultado = await pool.query("INSERT INTO evaluaciones SET ?", [req.body]);
            res.json({"resultado": "exito"});
        } catch (error) {
            res.json({ "error": error });
            console.log("Error al listar: " + error);
        }
    }

    public async modificarEvaluacion(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const resultado = await pool.query("UPDATE evaluaciones SET ? WHERE id = ?", [req.body, id]);
            res.json({"resultado": req.params});
            console.log(req.params);
        } catch (error) {
            res.json({ "error": error });
        }
    }

    /**
     * eliminarEvaluacion Elimina un registro en la tabla evaluaciones indicado por su id
     */
    public async eliminarEvaluacion(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const resultado = await pool.query("DELETE FROM evaluaciones WHERE id = ?", [id]);
            res.json({"resultado": "exito"});
        } catch (error) {
            res.json({ "error": error });
            console.log("Error al listar: " + error);
        }
    }

}

const evaluacionesController = new EvaluacionesController();
export default evaluacionesController;