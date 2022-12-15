import { Router } from 'express';

import * as productController from '../controllers/productController';
import * as orderController from '../controllers/orderController';
import * as userController from '../controllers/userController';
import userMiddleware from '../middlewares/userMiddleware';
import productMiddleware from '../middlewares/productMiddleware';
import userCreate7Middleware from '../middlewares/userCreate7Middleware';
import orderMiddleware from '../middlewares/orderMiddleware';
import validateJWT from '../auth/validateJWT';

const router = Router();

router.get('/products', productController.getAll);
router.get('/orders', orderController.getAllOrders);
router.post('/login', userMiddleware, userController.login);
router.post('/products', productMiddleware, productController.createProduct);
router.post('/users', userCreate7Middleware, userController.default);
router.post('/orders', validateJWT, orderMiddleware, orderController.default);

export default router;