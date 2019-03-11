import { Request, Response } from "express";
import pool from '../database';
import generalController from "./generalController";

class InicioController {
    obtenerTareasSemana(req: Request, res: Response) {
        try {
            var fecha: any = new Date();
            console.log(fecha);
            fecha = fecha.getFullYear() + "-" + (+fecha.getMonth() + 1) + "-" + fecha.getDate();
            console.log(fecha);
            var consulta = "SELECT * FROM tareas WHERE idUsuario = 'MASTER' AND DATEDIFF(FechaEntrega, " + fecha + ") < 8";
            console.log(consulta)
            const respuesta = pool.query(consulta);
            res.json(respuesta);
        } catch (error) {
            console.error(error);
        }
    }
}

const inicioController = new InicioController();
export default inicioController;