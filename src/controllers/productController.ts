import { Request, Response } from 'express';

import { IProduct, UserCredentials } from '../interfaces';
import * as productService from '../services/productService';

export async function getAll(_req: Request, res: Response) {
  const { status, data } = await productService.getAll();
  res.status(status).json(data);
}

export async function getAllOrders(_req: Request, res: Response) {
  const { status, data } = await productService.getAllOrders();
  res.status(status).json(data);
}

export async function createProduct(req: Request, res: Response) {
  const product = req.body as IProduct;
  const { status, data } = await productService.createProduct(product);
  res.status(status).json(data);
}

export async function createUser(req: Request, res: Response) {
  const user = req.body as UserCredentials;
  const { status, data, error } = await productService.createUser(user);

  return error
    ? res.status(status).json({ error })
    : res.status(status).json(data);
}

export async function login(req: Request, res: Response) {
  const userCredentials = req.body as UserCredentials;
  const { status, data, error } = await productService.login(userCredentials);

  return error ? res.status(status)
    .json({ message: error.message }) : res.status(status).json(data);
}

export async function createOrder(req: Request, res: Response) {
  const { productsIds, user: { id: userId } } = req.body;
  const { status, data } = await productService.createOrder({ userId, productsIds });
  res.status(status).json(data);
}
