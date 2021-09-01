import { Router } from 'express';

import userController from '../controllers/userController';

class UserRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', userController.list);
        this.router.post('/', userController.create);
        // this.router.get('/:id', userController.getOne);
        this.router.get('/:id', userController.validateUser);
        this.router.get('/login/:id', userController.validatePassword);
        this.router.put('/:id', userController.update);
        this.router.delete('/:id', userController.delete);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;