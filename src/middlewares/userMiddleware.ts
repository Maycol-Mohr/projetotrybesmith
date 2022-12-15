import { NextFunction, Request, Response } from 'express';

import { User } from '../interfaces';

export default function validateBody(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body as User;
  if (!username) {
    const message = '"username" is required';
    return res.status(400).json({ message });
  }
  if (!password) {
    const message = '"password" is required';
    return res.status(400).json({ message });
  }

  next();
}