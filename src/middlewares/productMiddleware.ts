import { NextFunction, Request, Response } from 'express';

import { Product } from '../interfaces';

function validateItemsString(name: string, amount: string) {
  if (typeof name !== 'string') {
    const message = '"name" must be a string';
    return ({ status: 422, message });
  }
  if (typeof amount !== 'string') {
    const message = '"amount" must be a string';
    return ({ status: 422, message });
  }
  return null;
}

function validateItemsMinimun(name: string, amount: string) {
  if (name.length < 3) {
    const message = '"name" length must be at least 3 characters long';
    return ({ status: 422, message });
  }
    
  if (amount.length < 3) {
    const message = '"amount" length must be at least 3 characters long';
    return ({ status: 422, message });
  }
    
  return null;
}

export default function validateRequired(req: Request, res: Response, next: NextFunction) {
  const { name, amount } = req.body as Product;
  if (!name) {
    const message = '"name" is required';
    return res.status(400).json({ message });
  }
  if (!amount) {
    const message = '"amount" is required';
    return res.status(400).json({ message });
  }
  
  let error = validateItemsString(name, amount);
  
  if (error) return res.status(error.status).json({ message: error.message });
  
  error = validateItemsMinimun(name, amount);
  
  if (error) return res.status(error.status).json({ message: error.message });
  
  next();
}

// import { NextFunction, Request, Response } from 'express';
// import Joi from 'joi';
// const productSchema = Joi.object(
//   {
//     name: Joi.string().min(3).required(),
//     amount: Joi.string().min(3).required(),
//   },
// );
// const validateProduct = (req: Request, res: Response, next: NextFunction) => {
//   const { error } = productSchema.validate(req.body);
//   if (error) {
//     const [details] = error.details;
//     const statusCode = details.type === 'any.required' ? 400 : 422; 
//     return res.status(statusCode).json({ message: error.message });
//   }
//   next();
// };
// export default validateProduct;
