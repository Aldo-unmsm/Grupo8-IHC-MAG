import { Request, Response } from 'express';

import pool from '../database';

class  PostsController {
    
    public async list (req: Request, res: Response) {
        const games = await pool.query('select * from post');
        res.json(games);
    }

    public async listMyPosts (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM post WHERE int_usercodigo = ?', [id]);
        res.json(games);
    }

    public async create (req: Request, res: Response): Promise<void> {
        console.log(req.body);
        await pool.query('INSERT INTO post SET ?', [req.body]);
        res.json({message: 'Post Saved'});
    }

    public async create_game (req: Request, res: Response): Promise<void> {
        console.log(req.body);
        await pool.query('call save_game(?,?,?,?)',
        [req.body.p_usercodigo,req.body.p_title,req.body.p_description,req.body.p_image]);
        res.json({message: 'Post Saved'});
    }

    public async getOne (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const game = await pool.query('SELECT * FROM post WHERE int_postcodigo = ?', [id]);
        if (game.length > 0) {
            return res.json(game[0]);
        } else {
            res.status(404).json({text: "Post doesn't exists"});
        }
    }

    public async update (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const game = await pool.query('SELECT * FROM post WHERE int_postcodigo = ?', [id]);
        if (game.length > 0) {
            await pool.query('UPDATE post SET id=?, vch_postdescripcion=?, vch_postimagen=? WHERE int_postcodigo = ?',
            [req.body.id,req.body.vch_postdescripcion,req.body.vch_postimagen, id]);
            res.json({message: 'The post was update'});
        } else {
            res.status(404).json({text: "Post doesn't exists"});
        }
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const game = await pool.query('SELECT * FROM post WHERE int_postcodigo = ?', [id]);
        if (game.length > 0) {
            await pool.query('DELETE FROM post WHERE int_postcodigo = ?', [id]);
            res.json({message: 'The post was deleted'});
        } else {
            res.status(404).json({text: "Post doesn't exists"});
        }
    }
}

const postsController = new PostsController();
export default postsController;