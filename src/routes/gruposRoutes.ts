import { Router } from "express";
import gruposController from "../controllers/gruposController";


class GruposRoutes {
    public router: Router = Router();

    constructor() {
        this.config()
     }

    config():void {
        this.router.post('/lista', gruposController.listarGrupos);
        this.router.post('/:id', gruposController.obtenerGrupoPorId);
        this.router.post('/', gruposController.crearGrupo);
        this.router.put('/:id',gruposController.modificarGrupo);
        this.router.post('/fin/:id', gruposController.eliminiarGrupo);
    }
}
const gruposRoutes = new GruposRoutes();
export default gruposRoutes.router;