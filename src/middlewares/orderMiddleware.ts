import { NextFunction, Request, Response } from 'express';

import { IOrder } from '../interfaces';

function validateProductsIdsIsArray(productsIds: number[]) {
  if (!Array.isArray(productsIds)) {
    const message = '"productsIds" must be an array';
    return ({ status: 422, message });
  }

  return null;
}

function validateProductsIdsIsEmpty(productsIds: number[]) {
  if (!productsIds.length) {
    const message = '"productsIds" must include only numbers';
    return ({ status: 422, message });
  }
    
  return null;
}

export default function validateRequired(req: Request, res: Response, next: NextFunction) {
  const { productsIds } = req.body as IOrder;
  
  if (!productsIds) {
    const message = '"productsIds" is required';
    return res.status(400).json({ message });
  }
  
  let error = validateProductsIdsIsArray(productsIds);
  
  if (error) return res.status(error.status).json({ message: error.message });
  
  error = validateProductsIdsIsEmpty(productsIds);
  
  if (error) return res.status(error.status).json({ message: error.message });
  
  next();
}