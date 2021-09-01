import { Router } from 'express';

import gamesController from '../controllers/gamesController';

class GamesRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', gamesController.list);
        this.router.post('/', gamesController.create);
        this.router.get('/:id', gamesController.getOne);
        this.router.get('/MyGames/:id', gamesController.listMyGames);
        this.router.put('/:id', gamesController.update);
        this.router.delete('/:id', gamesController.delete);
    }
}

const gamesRoutes = new GamesRoutes();
export default gamesRoutes.router;