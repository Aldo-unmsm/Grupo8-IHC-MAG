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
class SesionController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield database_1.default.query('SELECT * FROM games');
            res.json(games);
        });
    }
    listMyGames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const games = yield database_1.default.query('SELECT * FROM games WHERE int_usercodigo = ?', [id]);
            res.json(games);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query('INSERT INTO games SET ?', [req.body]);
            res.json({ message: 'Game Saved' });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const game = yield database_1.default.query('SELECT * FROM games WHERE id = ?', [id]);
            if (game.length > 0) {
                return res.json(game[0]);
            }
            else {
                res.status(404).json({ text: "Game doesn't exists" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const game = yield database_1.default.query('SELECT * FROM games WHERE id = ?', [id]);
            if (game.length > 0) {
                yield database_1.default.query('UPDATE games SET ? WHERE id = ?', [req.body, id]);
                res.json({ message: 'The game was update' });
            }
            else {
                res.status(404).json({ text: "Game doesn't exists" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const game = yield database_1.default.query('SELECT * FROM games WHERE id = ?', [id]);
            if (game.length > 0) {
                yield database_1.default.query('DELETE FROM games WHERE id = ?', [id]);
                res.json({ message: 'The game was deleted' });
            }
            else {
                res.status(404).json({ text: "Game doesn't exists" });
            }
        });
    }
}
const sesionController = new SesionController();
exports.default = sesionController;
