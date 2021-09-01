"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class PostsController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield database_1.default.query('select * from post');
            res.json(games);
        });
    }
    listMyPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const games = yield database_1.default.query('SELECT * FROM post WHERE int_usercodigo = ?', [id]);
            res.json(games);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query('INSERT INTO post SET ?', [req.body]);
            res.json({ message: 'Post Saved' });
        });
    }
    create_game(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query('call save_game(?,?,?,?)', [req.body.p_usercodigo, req.body.p_title, req.body.p_description, req.body.p_image]);
            res.json({ message: 'Post Saved' });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const game = yield database_1.default.query('SELECT * FROM post WHERE int_postcodigo = ?', [id]);
            if (game.length > 0) {
                return res.json(game[0]);
            }
            else {
                res.status(404).json({ text: "Post doesn't exists" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const game = yield database_1.default.query('SELECT * FROM post WHERE int_postcodigo = ?', [id]);
            if (game.length > 0) {
                yield database_1.default.query('UPDATE post SET id=?, vch_postdescripcion=?, vch_postimagen=? WHERE int_postcodigo = ?', [req.body.id, req.body.vch_postdescripcion, req.body.vch_postimagen, id]);
                res.json({ message: 'The post was update' });
            }
            else {
                res.status(404).json({ text: "Post doesn't exists" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const game = yield database_1.default.query('SELECT * FROM post WHERE int_postcodigo = ?', [id]);
            if (game.length > 0) {
                yield database_1.default.query('DELETE FROM post WHERE int_postcodigo = ?', [id]);
                res.json({ message: 'The post was deleted' });
            }
            else {
                res.status(404).json({ text: "Post doesn't exists" });
            }
        });
    }
}
const postsController = new PostsController();
exports.default = postsController;
