import { Request, Response } from 'express';

class  IndexController {
    public index (req: Request, res: Response) {
        //res.send('hello');
        res.json({text: 'API de JUEGOS esta en /api/games, API de USUARIOS esta en /api/users'});
    }
}

export const indexController = new IndexController();