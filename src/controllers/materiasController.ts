import { Request, Response } from "express";
import pool from '../database';
import { request } from "https";

class MateriasController {

    public async listarMaterias(req: Request, res: Response): Promise<void> {
        try {
            const resultado = await pool.query("SELECT * FROM materias WHERE idUsuario = 'MASTER'");
            res.json(resultado);
        } catch (error) {
            console.log("Consulta de listar no exitosa: " + error);
        }
    }

    public async buscarMateriaPorID(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const resultado = await pool.query('SELECT * FROM materias WHERE id = ?', [id]);
            if (resultado[0].idUsuario != 'MASTER') {
                res.json({ "error": resultado });
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
            await pool.query('DELETE FROM materias WHERE id = ?', [id]);
            res.json({ "Éxito": "Materia eliminada exitosamente." });
        } catch (error) {
            res.json({ "Error": "Error al eliminar materia: " + error });
        }
    }

}

const materiasController = new MateriasController();
export default materiasController;