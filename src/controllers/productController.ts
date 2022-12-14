import { Request, Response } from 'express';

import { IProduct, UserCredentials } from '../interfaces';
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

export async function createUser(req: Request, res: Response) {
  const user = req.body as UserCredentials;
  const { status, data, error } = await productService.createUser(user);

  return error
    ? res.status(status).json({ error })
    : res.status(status).json(data);
}

// export async function getById(req: Request, res: Response) {
//   const { id } = req.params;
//   const { status, data, error } = await restaurantService.getById(Number(id));

//   return error
//     ? res.status(status).json({ error })
//     : res.status(status).json(data);
// }

// export async function createUser(req: Request, res: Response) {
//   const user = req.body as IUser;
//   const { status, data, error } = await userService.create(user);

//   return error
//     ? res.status(status).json({ error })
//     : res.status(status).json(data);
// }

// export async function update(req: Request, res: Response) {
//   const { id } = req.params;
//   const restaurant = req.body as IRestaurant;

//   const { status, data, error } = await restaurantService.update(Number(id), restaurant);

//   return error
//     ? res.status(status).json({ error })
//     : res.status(status).json(data);
// }

// export async function remove(req: Request, res: Response) {
//   const { id } = req.params;
//   const { status, data, error } = await restaurantService.remove(Number(id));

//   return error
//     ? res.status(status).json({ error })
//     : res.status(status).json(data);
// }

// export async function getAllOpen(_req: Request, res: Response) {
//   const { status, data, error } = await restaurantService.getAllOpen();

//   return error
//     ? res.status(status).json({ error })
//     : res.status(status).json(data);
// }