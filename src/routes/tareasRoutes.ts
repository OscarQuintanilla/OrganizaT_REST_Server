import { Router } from 'express';
import tareasController from '../controllers/tareasController';

class TareasRoutes {
    public router: Router = Router();
    
    constructor(){
        this.config();
    }   

    config(): void{
        this.router.get('/', tareasController.listarTareas );
        this.router.get('/:id', tareasController.buscarTarea);
        this.router.post('/', tareasController.crearTarea );
        this.router.put('/:id', tareasController.modificarTarea);
        this.router.delete('/:id', tareasController.eliminarTarea);
        
    }

}

const tareasRoutes  = new TareasRoutes();
export default tareasRoutes.router;
