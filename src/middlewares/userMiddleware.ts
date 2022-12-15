import { NextFunction, Request, Response } from 'express';

import { User } from '../interfaces';

// function validateData(username: string, password: string) {
//   if (username !== 'string') {
//     const message = 'Username or password invalid';
//     return ({ status: 401, message });
//   }

//   if (password !== 'string') {
//     const message = 'Username or password invalid';
//     return ({ status: 401, message });
//   }
// }

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

  //   const error = validateData(username, password);

  //   if (error) return res.status(error.status).json({ message: error.message });

  next();
}