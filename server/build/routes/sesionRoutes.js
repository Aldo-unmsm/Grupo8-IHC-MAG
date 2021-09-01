"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sesionController_1 = __importDefault(require("../controllers/sesionController"));
class SesionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', sesionController_1.default.list);
        this.router.post('/', sesionController_1.default.create);
        this.router.get('/:id', sesionController_1.default.getOne);
        this.router.get('/MyGames/:id', sesionController_1.default.listMyGames);
        this.router.put('/:id', sesionController_1.default.update);
        this.router.delete('/:id', sesionController_1.default.delete);
    }
}
const sesionRoutes = new SesionRoutes();
exports.default = sesionRoutes.router;
