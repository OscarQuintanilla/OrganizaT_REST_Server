import { Request, Response } from "express";

import pool from '../database';

class GamesController {
    public index (req: Request, res: Response)  {
        //res.send('Games.')
        pool.query('DESCRIBE tareas');
        res.json('tareas');
    }
}

const  gamesController = new GamesController();
export default gamesController;