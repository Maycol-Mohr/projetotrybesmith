import { Router } from 'express';

import * as productController from '../controllers/productController';
// import restaurantMiddleware from '../middlewares/restaurantMiddleware';

const router = Router();

router.get('/products', productController.getAll);
router.post('/products', productController.createProduct);
// router.get('/:id', restaurantController.getById);
// router.get('/', restaurantController.getAll);
// router.delete('/:id', restaurantController.remove);

// router.use(restaurantMiddleware);

// router.post('/product', productController.create);
// router.post('/user', productController.createUser);
// router.put('/:id', restaurantController.update);

export default router;