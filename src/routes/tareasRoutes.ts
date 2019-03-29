import { Router } from 'express';
import tareasController from '../controllers/tareasController';

class TareasRoutes {
    public router: Router = Router();
    
    constructor(){
        this.config();
    }   

    config(): void{
        this.router.post('/lista/', tareasController.listarTareas );
        this.router.post('/:id', tareasController.buscarTarea);
        this.router.post('/', tareasController.crearTarea );
        this.router.put('/:id', tareasController.modificarTarea);
        this.router.post('/fin/:id', tareasController.eliminarTarea);
        
    }

}

const tareasRoutes  = new TareasRoutes();
export default tareasRoutes.router;
