import jwt from 'jsonwebtoken';
import { IProduct, UserCredentials } from '../interfaces';
import * as productModel from '../models/productModel';
// import connection from './connection';

// const MESSAGES = {
//   RESTAURANT_NOT_FOUND: 'Restaurant not found',
// };

import { secret, config } from '../middlewares/jwtConfig';

// import IToken from '../interfaces/IToken';

const MESSAGES = {
//   USER_NOT_FOUND: 'User not found',
//   UNAUTHORIZED: 'Invalid email or password',
  USER_EXISTS: 'User already exists',
//   FORBIDDEN: 'You are not allowed to take this action',
};

export async function getAll() {
  const data = await productModel.getAll();
  return { status: 200, data };
}

export async function createProduct(product: IProduct) {
  const data = await productModel.create(product);
  return { status: 201, data };
}

export async function createUser(user: UserCredentials) {
  const userExists = await productModel.getByUsername(user.username);
  if (userExists) {
    return { status: 400, error: { message: MESSAGES.USER_EXISTS } };
  }

  const payload = await productModel.createUser(user);
  const token = jwt.sign({ payload }, secret, config);
  const data = { token, ...payload };
  return { status: 201, data };
}

// export async function createUser(user: IUser) {
//   const userExists = await productModel.getByUsername(user.username);
//   if (userExists) {
//     return { status: 400, error: { message: MESSAGES.USER_NOT_FOUND } };
//   }

//   const payload = await productModel.create(user);
//   const token = jwt.sign({ payload }, secret, config);
//   const data = { token, ...payload };
//   return { status: 201, data };
// }

// // export async function getById(id: number) {
// //   const data = await restaurantModel.getById(id);

// //   if (data === null) return { status: 404, error: { message: MESSAGES.RESTAURANT_NOT_FOUND } };
// //   return { status: 200, data };
// // }

// export async function getByUsername(username: string): Promise<User | null> {
//   const query = 'SELECT * FROM Users WHERE email = ?';
//   const values = [username];

//   const [data] = await connection.execute(query, values);
//   const [user] = data as User[];

//   return user || null;
// }

// export async function update(id: number, restaurant: IRestaurant) {
//   const data = await restaurantModel.update(id, restaurant);

//   if (data === null) return { status: 404, error: { message: MESSAGES.RESTAURANT_NOT_FOUND } };
//   return { status: 200, data };
// }

// export async function remove(id: number) {
//   const data = await restaurantModel.remove(id);

//   if (data === null) return { status: 404, error: { message: MESSAGES.RESTAURANT_NOT_FOUND } };
//   return { status: 200, data };
// }

// export async function getAllOpen() {
//   const data = await restaurantModel.getAllOpen();

//   if (!data.length) return { status: 404, error: { message: MESSAGES.RESTAURANT_NOT_FOUND } };
//   return { status: 200, data };
// }