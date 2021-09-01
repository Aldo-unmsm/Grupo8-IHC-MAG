"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    index(req, res) {
        //res.send('hello');
        res.json({ text: 'API de JUEGOS esta en /api/games, API de USUARIOS esta en /api/users' });
    }
}
exports.indexController = new IndexController();
