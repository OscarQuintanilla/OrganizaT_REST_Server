import { Router } from "express";
import evaluacionesController from "../controllers/evaluacionesController";

class EvaluacionesRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', evaluacionesController.listarEvaluaciones);
        this.router.get('/:id', evaluacionesController.obtenerEvaluacionPorId);
        this.router.post('/', evaluacionesController.crearEvaluacion);
        this.router.put('/:id', evaluacionesController.modificarEvaluacion);
        this.router.delete('/:id', evaluacionesController.eliminarEvaluacion);
    }

}

const evaluacionesRoutes = new EvaluacionesRoutes();
export default evaluacionesRoutes.router;