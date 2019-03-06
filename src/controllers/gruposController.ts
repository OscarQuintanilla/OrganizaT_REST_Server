import { Response, Request } from "express";
import pool from "../database";
import { request } from "https";

export class GruposController {

    public async listarGrupos(req: Request, res: Response) {
        try {
            const respuesta = await pool.query('SELECT *  FROM gruposdetrabajo WHERE idUsuario = "MASTER"');
            res.json(respuesta);
        } catch (error) {
            res.json(error);
        }
    }

    public async obtenerGrupoPorId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const respuesta = await pool.query("SELECT * FROM gruposdetrabajo WHERE idUsuario = 'MASTER' AND id = ?", [id])
            res.json(respuesta);
        } catch (error) {
            res.json(error);
        }
    }

    public async crearGrupo(req: Request, res: Response) {
        try {
            const respuesta = await pool.query('INSERT INTO gruposdetrabajo SET ?', [req.body]);
            res.json({ "respuesta": "hecho" });
        } catch (error) {
            res.json(error);
        }
    }

    public async modificarGrupo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const respuesta = await pool.query('UPDATE gruposdetrabajo SET ? WHERE id = ?', [req.body, id]);
            res.json({ "respuesta": "hecho" });
        } catch (error) {
            res.json(error);
        }
    }

    public async eliminiarGrupo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const respuesta = await pool.query('DELETE FROM gruposdetrabajo WHERE id = ?', [id]);
            res.json({ "respuesta": "hecho" });
        } catch (error) {
            res.json(error);
        }
    }
}

const gruposController = new GruposController();
export default gruposController;