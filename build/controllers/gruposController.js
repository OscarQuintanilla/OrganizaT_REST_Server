"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class GruposController {
    listarGrupos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta = yield database_1.default.query('SELECT *  FROM gruposdetrabajo WHERE idUsuario = "MASTER"');
                res.json(respuesta);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    obtenerGrupoPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const respuesta = yield database_1.default.query("SELECT * FROM gruposdetrabajo WHERE idUsuario = 'MASTER' AND id = ?", [id]);
                res.json(respuesta);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    crearGrupo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta = yield database_1.default.query('INSERT INTO gruposdetrabajo SET ?', [req.body]);
                res.json({ "respuesta": "hecho" });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    modificarGrupo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const respuesta = yield database_1.default.query('UPDATE gruposdetrabajo SET ? WHERE id = ?', [req.body, id]);
                res.json({ "respuesta": "hecho" });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    eliminiarGrupo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const respuesta = yield database_1.default.query('DELETE FROM gruposdetrabajo WHERE id = ?', [id]);
                res.json({ "respuesta": "hecho" });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
}
exports.GruposController = GruposController;
const gruposController = new GruposController();
exports.default = gruposController;
