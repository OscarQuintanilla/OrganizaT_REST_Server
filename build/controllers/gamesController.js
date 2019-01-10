"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class GamesController {
    index(req, res) {
        //res.send('Games.')
        database_1.default.query('DESCRIBE tareas');
        res.json('tareas');
    }
}
const gamesController = new GamesController();
exports.default = gamesController;
