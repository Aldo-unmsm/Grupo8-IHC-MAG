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
class UserController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield database_1.default.query('SELECT * FROM Usuario');
            res.json(users);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query('INSERT INTO Usuario (vch_userpaterno,vch_usermaterno,vch_usernombre,vch_userciudad,vch_userdireccion,vch_usertelefono,vch_userusuario,vch_userclave) VALUES (?,?,?,?,?,?,?,SHA(?))', [req.body.vch_userpaterno, req.body.vch_usermaterno, req.body.vch_usernombre, req.body.vch_userciudad, req.body.vch_userdireccion, req.body.vch_usertelefono, req.body.vch_userusuario, req.body.vch_userclave]);
            res.json({ message: 'User Saved' });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield database_1.default.query('SELECT * FROM Usuario WHERE int_usercodigo = ?', [id]);
            if (user.length > 0) {
                return res.json(user[0]);
            }
            else {
                res.status(404).json({ text: "User doesn't exists" });
            }
        });
    }
    validateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield database_1.default.query('SELECT * FROM Usuario WHERE vch_userusuario = ?', [id]);
            if (user.length > 0) {
                return res.json(user[0]);
            }
            else {
                res.status(404).json({ text: "User doesn't exists" });
            }
        });
    }
    validatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE Usuario SET boo_logsesion = true WHERE vch_userclave = SHA(?)', [id]);
            const user = yield database_1.default.query('SELECT * FROM Usuario WHERE vch_userclave = SHA(?)', [id]);
            if (user.length > 0) {
                return res.json(user[0]);
            }
            else {
                res.status(404).json({ text: "User doesn't exists" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield database_1.default.query('SELECT * FROM Usuario WHERE int_usercodigo = ?', [id]);
            if (user.length > 0) {
                yield database_1.default.query('UPDATE Usuario SET ? WHERE int_usercodigo = ?', [req.body, id]);
                res.json({ message: 'The User was update' });
            }
            else {
                res.status(404).json({ text: "User doesn't exists" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield database_1.default.query('SELECT * FROM Usuario WHERE int_usercodigo = ?', [id]);
            if (user.length > 0) {
                yield database_1.default.query('DELETE FROM Usuario WHERE int_usercodigo = ?', [id]);
                res.json({ message: 'The User was deleted' });
            }
            else {
                res.status(404).json({ text: "User doesn't exists" });
            }
        });
    }
}
const userController = new UserController();
exports.default = userController;
