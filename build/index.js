"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const tareasRoutes_1 = __importDefault(require("./routes/tareasRoutes"));
const generalRoutes_1 = __importDefault(require("./routes/generalRoutes"));
const materiasRoutes_1 = __importDefault(require("./routes/materiasRoutes"));
const evaluacionesRoutes_1 = __importDefault(require("./routes/evaluacionesRoutes"));
console.log('Server Starts...');
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    //Configura el app
    config() {
        //Se le asigna el puerto al servidor
        //process.env.PORT Permite que el servidor utilice el puerto proporcionado por el servicio en la nube
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    //Rutas del servidor
    routes() {
        this.app.use("/tareas", tareasRoutes_1.default);
        this.app.use("/general", generalRoutes_1.default);
        this.app.use("/materias", materiasRoutes_1.default);
        this.app.use("/evaluaciones", evaluacionesRoutes_1.default);
    }
    //Inicializa el servidor
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor en el puerto: ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
