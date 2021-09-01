import { Request, Response } from 'express';

import pool from '../database';

class  GamesController {
    public async list (req: Request, res: Response) {
        const games = await pool.query('SELECT * FROM games');
        res.json(games);
    }

    public async listMyGames (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM games WHERE int_usercodigo = ?', [id]);
        res.json(games);
    }

    public async create (req: Request, res: Response): Promise<void> {
        console.log(req.body);
        await pool.query('INSERT INTO games SET ?', [req.body]);
        res.json({message: 'Game Saved'});
    }

    public async getOne (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const game = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
        if (game.length > 0) {
            return res.json(game[0]);
        } else {
            res.status(404).json({text: "Game doesn't exists"});
        }
    }

    public async update (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const game = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
        if (game.length > 0) {
            await pool.query('UPDATE games SET ? WHERE id = ?', [req.body, id]);
            res.json({message: 'The game was update'});
        } else {
            res.status(404).json({text: "Game doesn't exists"});
        }
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const game = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
        if (game.length > 0) {
            await pool.query('DELETE FROM games WHERE id = ?', [id]);
            res.json({message: 'The game was deleted'});
        } else {
            res.status(404).json({text: "Game doesn't exists"});
        }
    }
}

const gamesController = new GamesController();
export default gamesController;