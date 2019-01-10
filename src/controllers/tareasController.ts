import { Request, Response } from "express";
import pool from '../database';
import { request } from "https";

class TareasController {
    public listarTareas(req: Request, res: Response) {
        //res.send('Games.')
        pool.query('DESCRIBE tareas');
        res.json('tareas');
    }

    public buscarTarea(req: Request, res: Response) {
        res.json({ text: 'Buscando ' + req.params.id })
    }

    public async crearTarea(req: Request, res: Response) {
        try {
            await pool.query('INSERT INTO tareas SET ?', [req.body])
            res.json({ message: 'Insertado' });
            console.log("Tarea insertada.");
        } catch (error) {
            console.log("No se pudo insertar la tarea.");
            res.json({ message: error });
        }


    }

    public modificarTarea(req: Request, res: Response) {
        res.json({ text: 'Modificando ' + req.params.id });
    }

    public eliminarTarea(req: Request, res: Response) {
        res.json({ text: 'Eliminando ' + req.params.id });
    }

}

const tareasController = new TareasController();
export default tareasController;