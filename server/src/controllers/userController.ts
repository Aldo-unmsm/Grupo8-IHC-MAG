import { Request, Response } from 'express';

import pool from '../database';

class  UserController {
    public async list (req: Request, res: Response) {
        const users = await pool.query('SELECT * FROM Usuario');
        res.json(users);
    }

    public async create (req: Request, res: Response): Promise<void> {
        console.log(req.body);
        await pool.query('INSERT INTO Usuario (vch_userpaterno,vch_usermaterno,vch_usernombre,vch_userciudad,vch_userdireccion,vch_usertelefono,vch_userusuario,vch_userclave) VALUES (?,?,?,?,?,?,?,SHA(?))', [req.body.vch_userpaterno,req.body.vch_usermaterno,req.body.vch_usernombre,req.body.vch_userciudad,req.body.vch_userdireccion,req.body.vch_usertelefono,req.body.vch_userusuario,req.body.vch_userclave]);
        
        res.json({message: 'User Saved'});
    }

    public async getOne (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const user = await pool.query('SELECT * FROM Usuario WHERE int_usercodigo = ?', [id]);
        if (user.length > 0) {
            return res.json(user[0]);
        } else {
            res.status(404).json({text: "User doesn't exists"});
        }
    }

    public async validateUser (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const user = await pool.query('SELECT * FROM Usuario WHERE vch_userusuario = ?', [id]);
        if (user.length > 0) {
            return res.json(user[0]);
        } else {
            res.status(404).json({text: "User doesn't exists"});
        }
    }

    public async validatePassword (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        await pool.query('UPDATE Usuario SET boo_logsesion = true WHERE vch_userclave = SHA(?)', [id]);
        const user = await pool.query('SELECT * FROM Usuario WHERE vch_userclave = SHA(?)', [id]);
        if (user.length > 0) {
            return res.json(user[0]);
        } else {
            res.status(404).json({text: "User doesn't exists"});
        }
    }

    public async update (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const user = await pool.query('SELECT * FROM Usuario WHERE int_usercodigo = ?', [id]);
        if (user.length > 0) {
            await pool.query('UPDATE Usuario SET ? WHERE int_usercodigo = ?', [req.body, id]);
            res.json({message: 'The User was update'});
        } else {
            res.status(404).json({text: "User doesn't exists"});
        }
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const user = await pool.query('SELECT * FROM Usuario WHERE int_usercodigo = ?', [id]);
        if (user.length > 0) {
            await pool.query('DELETE FROM Usuario WHERE int_usercodigo = ?', [id]);
            res.json({message: 'The User was deleted'});
        } else {
            res.status(404).json({text: "User doesn't exists"});
        }
    }
}

const userController = new UserController();
export default userController;