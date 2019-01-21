"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generalController_1 = __importDefault(require("../controllers/generalController"));
class GeneralRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:tipo', generalController_1.default.generarId);
    }
}
const generalRoutes = new GeneralRoutes();
exports.default = generalRoutes.router;
