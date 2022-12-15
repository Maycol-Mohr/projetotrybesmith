import { Router } from 'express';

import * as productController from '../controllers/productController';
import userMiddleware from '../middlewares/userMiddleware';

const router = Router();

router.get('/products', productController.getAll);
router.get('/orders', productController.getAllOrders);
router.post('/login', userMiddleware, productController.login);
router.post('/products', productController.createProduct);
router.post('/users', productController.createUser);

export default router;