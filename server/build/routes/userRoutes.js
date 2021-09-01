"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', userController_1.default.list);
        this.router.post('/', userController_1.default.create);
        // this.router.get('/:id', userController.getOne);
        this.router.get('/:id', userController_1.default.validateUser);
        this.router.get('/login/:id', userController_1.default.validatePassword);
        this.router.put('/:id', userController_1.default.update);
        this.router.delete('/:id', userController_1.default.delete);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
