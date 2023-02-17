import { Request, Response } from 'express';
import { IProduct } from '../interfaces';
import * as productService from '../services/productService';

export async function getAll(_req: Request, res: Response) {
  const { status, data } = await productService.getAll();
  res.status(status).json(data);
}

export async function createProduct(req: Request, res: Response) {
  const product = req.body as IProduct;
  const { status, data } = await productService.createProduct(product);
  res.status(status).json(data);
}

export async function getById(req: Request, res: Response) {
  const { id } = req.params;
  const { status, data, error } = await productService.getById(Number(id));

  return error ? res.status(status).json({ error }) : res.status(status).json(data);
}
