import { Request, Response } from "express";
import pool from '../database';
import { request } from "https";

class MateriasController {

    public async listarMaterias(req: Request, res: Response): Promise<void> {
        try {
            const { idUsuario } = req.body;
            const resultado = await pool.query("SELECT * FROM materias WHERE idUsuario = ?", [idUsuario]);
            res.json(resultado);
        } catch (error) {
            console.log("Consulta de listar no exitosa: " + error);
        }
    }

    public async buscarMateriaPorId(req: Request, res: Response) {
        try {
            console.log(req.body);
            const { idUsuario } = req.body[0];
            const { id } = req.params;

            const resultado = await pool.query('SELECT * FROM materias WHERE id = ? AND idUsuario = ?', [id, idUsuario]);
            if (resultado[0].idUsuario != idUsuario) {
                resultado == null;
                res.json({ "error": "sin permiso" });
            } else {
                res.json(resultado);
            }

        } catch (error) {
            console.log("No se pudo encontrar: " + error);
        }
    }

    public async crearMateria(req: Request, res: Response) {
        try {
            await pool.query('INSERT INTO materias SET ?', [req.body]);
            res.json({ "Éxito": "Materia registrada con éxito" });
        } catch (error) {
            res.json({ "Error": "Error al registrar materia: " + error });
        }
    }

    public async modificarMateria(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await pool.query('UPDATE materias SET ? WHERE id = ?', [req.body, id]);
            res.json({ "Éxito": "Materia modificada exitosamente." });
        } catch (error) {
            res.json({ "Error": "Error al modificar materia: " + error });
        }
    }

    public async eliminarMateria(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { idUsuario } = req.body;
            await pool.query('DELETE FROM materias WHERE id = ? AND idUsuario = ?', [id, idUsuario]);
            res.json({ "Éxito": "Materia eliminada exitosamente." });
        } catch (error) {
            res.json({ "Error": "Error al eliminar materia: " + error });
        }
    }

}

const materiasController = new MateriasController();
export default materiasController;