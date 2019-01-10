import { Router } from 'express';

import gamesController from '../controllers/gamesController';

class GamesRoutes {
    public router: Router = Router();
    
    constructor(){
        this.config();
    }   

    config(): void{
        this.router.get('/', gamesController.index );
        this.router.post('/', )
    }

}

const gamesRoutes  = new GamesRoutes();
export default gamesRoutes.router;
