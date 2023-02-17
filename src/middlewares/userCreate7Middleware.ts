import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const productSchema = Joi.object(
  {
    username: Joi.string().min(3).required(),
    vocation: Joi.string().min(3).required(),
    level: Joi.number().min(1).required(),
    password: Joi.string().min(8).required(),
  },
);
const validateProduct = (req: Request, res: Response, next: NextFunction) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    const [details] = error.details;
    const statusCode = details.type === 'any.required' ? 400 : 422; 
    return res.status(statusCode).json({ message: error.message });
  }
  next();
};
export default validateProduct;

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

// import { NextFunction, Request, Response } from 'express';

// import { User } from '../interfaces';

// function validateItemsString(username: string, vocation: string, level: number, password: string) {
//   if (typeof username !== 'string') {
//     const message = '"username" must be a string';
//     return ({ status: 422, message });
//   }
//   if (typeof vocation !== 'string') {
//     const message = '"vocation" must be a string';
//     return ({ status: 422, message });
//   }
//   if (typeof level !== 'number') {
//     const message = '"level" must be a number';
//     return ({ status: 422, message });
//   }
//   if (typeof password !== 'string') {
//     const message = '"password" must be a string';
//     return ({ status: 422, message });
//   }
//   return null;
// }

// function validateItemsMinimun(username: string, vocation: string, level: number, password: string) {
//   if (username.length < 3) {
//     const message = '"username" length must be at least 3 characters long';
//     return ({ status: 422, message });
//   }
    
//   if (vocation.length < 3) {
//     const message = '"vocation" length must be at least 3 characters long';
//     return ({ status: 422, message });
//   }
//   if (Number(level) < 1) {
//     const message = '"level" must be greater than or equal to 1';
//     return ({ status: 422, message });
//   }
//   if (password.length < 8) {
//     const message = '"password" length must be at least 8 characters long';
//     return ({ status: 422, message });
//   }
    
//   return null;
// }

// function validateIsRequired(username: string, vocation: string, level: number, password: string) {
//   if (!username) {
//     const message = '"username" is required';
//     return ({ status: 400, message });
//   }
//   if (!vocation) {
//     const message = '"vocation" is required';
//     return ({ status: 400, message });
//   }
//   if (level !== 0 && !level) {
//     const message = '"level" is required';
//     return ({ status: 400, message });
//   }
//   if (!password) {
//     const message = '"password" is required';
//     return ({ status: 400, message });
//   }
//   return null;
// }

// export default function validateRequired(req: Request, res: Response, next: NextFunction) {
//   const { username, vocation, level, password } = req.body as User;
//   // if (!username) {
//   //   const message = '"username" is required';
//   //   return res.status(400).json({ message });
//   // }
//   // if (!vocation) {
//   //   const message = '"vocation" is required';
//   //   return res.status(400).json({ message });
//   // }
//   // if (!level) {
//   //   const message = '"level" is required';
//   //   return res.status(400).json({ message });
//   // }
//   // if (!password) {
//   //   const message = '"password" is required';
//   //   return res.status(400).json({ message });
//   // }

//   let error = validateIsRequired(username, vocation, level, password);
  
//   if (error) return res.status(error.status).json({ message: error.message });
  
//   error = validateItemsString(username, vocation, level, password);
  
//   if (error) return res.status(error.status).json({ message: error.message });
  
//   error = validateItemsMinimun(username, vocation, level, password);
  
//   if (error) return res.status(error.status).json({ message: error.message });

//   next();
// }
