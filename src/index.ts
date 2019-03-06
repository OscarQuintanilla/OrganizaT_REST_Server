import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import tareasRoutes from './routes/tareasRoutes';
import generalRoutes  from "./routes/generalRoutes";
import materiasRoutes from './routes/materiasRoutes';
import evaluacionesRoutes from './routes/evaluacionesRoutes';
import gruposRoutes from "./routes/gruposRoutes";


console.log('Server Starts...');
class Server {

    public app: Application;
    

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    //Configura el app
    config(): void{ 
        //Se le asigna el puerto al servidor
        //process.env.PORT Permite que el servidor utilice el puerto proporcionado por el servicio en la nube
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));

    }
    //Rutas del servidor
    routes(): void{ 
        this.app.use("/tareas", tareasRoutes);
        this.app.use("/general", generalRoutes);
        this.app.use("/materias", materiasRoutes);
        this.app.use("/evaluaciones", evaluacionesRoutes);
        this.app.use("/grupos", gruposRoutes);
    }
    //Inicializa el servidor
    start(): void{         
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor en el puerto: ', this.app.get('port'))
        }); 
    }

}

const server = new Server();
server.start();
