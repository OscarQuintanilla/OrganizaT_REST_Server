import { Router } from "express";
import materiasController from "../controllers/materiasController";

class MateriasRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/', materiasController.listarMaterias);
        this.router.get('/:id', materiasController.buscarMateriaPorId);
        this.router.post('/', materiasController.crearMateria);
        this.router.put('/:id', materiasController.modificarMateria);
        this.router.delete('/:id', materiasController.eliminarMateria);
    }
}

const materiasRoutes = new MateriasRoutes();
export default materiasRoutes.router;