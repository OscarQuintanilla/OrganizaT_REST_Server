import { Router } from "express";
import sesionController from "../controllers/sesionController";

class SesionRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.post('/', sesionController.verificarDatos);
        this.router.post('/registrar', sesionController.crearCuenta);
        this.router.put('/', sesionController.actualizarDatos);
        this.router.delete('/:idUsuario', sesionController.borrarCuenta);
    }
}

const sesionRoutes = new SesionRoutes();
export default sesionRoutes.router;