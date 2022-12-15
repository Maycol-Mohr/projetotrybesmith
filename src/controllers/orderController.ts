import { Request, Response } from 'express';

import * as orderService from '../services/orderService';

export default async function createOrder(req: Request, res: Response) {
  const { productsIds, user: { id: userId } } = req.body;
  const { status, data } = await orderService.default({ userId, productsIds });
  res.status(status).json(data);
}

export async function getAllOrders(_req: Request, res: Response) {
  const { status, data } = await orderService.getAllOrders();
  res.status(status).json(data);
}