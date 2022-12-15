import { Router } from 'express';

import * as productController from '../controllers/productController';
import userMiddleware from '../middlewares/userMiddleware';
import productMiddleware from '../middlewares/productMiddleware';
import userCreate7Middleware from '../middlewares/userCreate7Middleware';

const router = Router();

router.get('/products', productController.getAll);
router.get('/orders', productController.getAllOrders);
router.post('/login', userMiddleware, productController.login);
router.post('/products', productMiddleware, productController.createProduct);
router.post('/users', userCreate7Middleware, productController.createUser);

export default router;