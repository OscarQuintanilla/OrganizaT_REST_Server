import { Router } from "express";
import materiasController from "../controllers/materiasController";

class MateriasRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.post('/lista', materiasController.listarMaterias);
        this.router.post('/:id', materiasController.buscarMateriaPorId);
        this.router.post('/crear/crear', materiasController.crearMateria);
        this.router.put('/:id', materiasController.modificarMateria);
        this.router.post('/fin/:id', materiasController.eliminarMateria);
    }
}

const materiasRoutes = new MateriasRoutes();
export default materiasRoutes.router;