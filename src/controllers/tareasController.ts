import { Request, Response } from "express";
import pool from '../database';
import { request } from "https";

class TareasController {
    public async listarTareas(req: Request, res: Response): Promise<void> {
        try {
            const result = await pool.query("SELECT * FROM tareas INNER JOIN usuario_tareas ON tareas.id = usuario_tareas.idTarea");
            res.json(result);
        } catch (error) {
            console.log(error);
        }
    }

    public async buscarTarea(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await pool.query("SELECT * FROM tareas WHERE id = ?", [id]);
            res.json(result);
        } catch (error) {
            console.log("Ocurrió un error en la consulta.");
        }
    }

    public async crearTarea(req: Request, res: Response) {
        try {
            //Crea el registro en la tabla tareas
            await pool.query('INSERT INTO tareas SET ?', [req.body])
            //Crea el registro en la tabla usuario_tareas
            const { id } = req.body;
            try {
                await pool.query('INSERT INTO usuario_tareas VALUES ("ADMIN", "' + id + '")');
            } catch (error) {
                console.log("Error en la inserción en la tabla usuario?tareas.");
                res.json({ message: error });
                await pool.query('DELETE FROM tareas WHERE id = ?', id);
            }

            res.json({ message: 'Insertado' });
            console.log("Tarea insertada.");
        } catch (error) {
            console.log("No se pudo insertar la tarea.");
            res.json({ message: error });
        }
    }

    public async modificarTarea(req: Request, res: Response) {
        try {
            const { id } = req.body;
            await pool.query("UPDATE tareas SET ? WHERE id = ?", [req.body, id]);
            res.json({ message: "Tarea actualizada." });
        } catch (error) {
            console.log("No se pudo insertar la tarea.");
        }
        res.json({ text: 'Modificando ' + req.params.id });
    }

    public async eliminarTarea(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM tareas WHERE id = ?', [id]);
        res.json({ message: "Juego Eliminado. " + id });
    }

}

const tareasController = new TareasController();
export default tareasController;