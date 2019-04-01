import { Router } from "express";
import evaluacionesController from "../controllers/evaluacionesController";

class EvaluacionesRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.post('/lista', evaluacionesController.listarEvaluaciones);
        this.router.post('/:id', evaluacionesController.obtenerEvaluacionPorId);
        this.router.post('/', evaluacionesController.crearEvaluacion);
        this.router.put('/:id', evaluacionesController.modificarEvaluacion);
        this.router.post('/fin/:id', evaluacionesController.eliminarEvaluacion);
    }

}

const evaluacionesRoutes = new EvaluacionesRoutes();
export default evaluacionesRoutes.router;