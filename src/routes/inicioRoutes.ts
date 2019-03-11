import { Router } from "express";
import inicioController from "../controllers/inicioController";

class InicioRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/', inicioController.obtenerTareasSemana);
    }
}

const inicioRoutes= new InicioRoutes();
export default inicioRoutes.router;