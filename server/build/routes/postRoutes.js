"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postsController_1 = __importDefault(require("../controllers/postsController"));
class PostsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', postsController_1.default.list);
        this.router.post('/', postsController_1.default.create);
        this.router.post('/game', postsController_1.default.create_game);
        this.router.get('/:id', postsController_1.default.getOne);
        this.router.get('/MyPosts/:id', postsController_1.default.listMyPosts);
        this.router.put('/:id', postsController_1.default.update);
        this.router.delete('/:id', postsController_1.default.delete);
    }
}
const postsRoutes = new PostsRoutes();
exports.default = postsRoutes.router;
