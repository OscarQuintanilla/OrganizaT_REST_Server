import { Request, Response } from "express";
import pool from "../database";

class SesionController {

    public async verificarDatos(req: Request, res: Response) {
        const { Correo } = req.body;
        const { NombreLogin } = req.body;
        const { Clave } = req.body;

        const respuesta = await pool.query(
            "SELECT * FROM usuario WHERE (Correo = ? AND Clave = ? ) OR (NombreLogin = ? AND Clave = ?) ",
            [Correo, Clave, NombreLogin, Clave]
        );
        res.json(respuesta);

    }

    public async actualizarDatos(req: Request, res: Response) {
        const { idUsuario } = req.body;
        const respuesta = await pool.query("UPDATE usuario  SET ? WHERE idUsuario = ?", [req.body, idUsuario]);
        res.json(respuesta);
    }

    public async crearCuenta(req: Request, res: Response) {
        const respuesta = await pool.query("INSERT INTO usuario SET ?", [req.body]);
        res.json(respuesta);
    }

    public async borrarCuenta(req: Request, res: Response) {
        const { idUsuario } = req.params;
        const respuesta = await pool.query("DELETE FROM usuario WHERE idUsuario = ?", [idUsuario]);
        res.json(respuesta);
    }

}

const sesionController = new SesionController();
export default sesionController;