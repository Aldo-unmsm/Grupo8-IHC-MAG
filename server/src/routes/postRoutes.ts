import { Router } from 'express';

import postsController from '../controllers/postsController';

class PostsRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', postsController.list);
        this.router.post('/', postsController.create);
        this.router.post('/game', postsController.create_game);
        this.router.get('/:id', postsController.getOne);
        this.router.get('/MyPosts/:id', postsController.listMyPosts);
        this.router.put('/:id', postsController.update);
        this.router.delete('/:id', postsController.delete);
    }
}

const postsRoutes = new PostsRoutes();
export default postsRoutes.router;