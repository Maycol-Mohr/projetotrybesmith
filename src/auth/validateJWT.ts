// src/auth/validateJWT.js
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import IToken from '../interfaces/Itoken';
import { secret } from '../middlewares/jwtConfig';

require('dotenv/config');

// const secret = 'Trybe';

export = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  
  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const user = jwt.verify(token, secret) as IToken;
    req.body.user = user.data;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};