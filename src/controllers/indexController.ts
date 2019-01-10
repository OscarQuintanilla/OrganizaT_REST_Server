import { Request, Response } from "express";

class IndexController {
    public index (req: Request, res: Response)  {
        res.send('Hola, Mundo.')}
}

export const  indexController = new IndexController();