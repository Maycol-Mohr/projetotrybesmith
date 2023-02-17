import { Request, Response } from 'express';

import { UserCredentials } from '../interfaces';
import * as userService from '../services/userService';

export default async function createUser(req: Request, res: Response) {
  const user = req.body as UserCredentials;
  const { status, data, error } = await userService.default(user);

  return error ? res.status(status).json({ error }) : res.status(status).json(data);
}

export async function login(req: Request, res: Response) {
  const userCredentials = req.body as UserCredentials;
  const { status, data, error } = await userService.login(userCredentials);

  return error ? res.status(status)
    .json({ message: error.message }) : res.status(status).json(data);
}

export async function getAll(_req: Request, res: Response) {
  const { status, data } = await userService.getAll();
  res.status(status).json(data);
}

export async function getById(req: Request, res: Response) {
  const { id } = req.params;
  const { status, data, error } = await userService.getById(Number(id));

  return error ? res.status(status).json({ error }) : res.status(status).json(data);
}
