import jwt from 'jsonwebtoken';
import { IOrder, IProduct, UserCredentials } from '../interfaces';
import * as productModel from '../models/productModel';
// import connection from './connection';

// const MESSAGES = {
//   RESTAURANT_NOT_FOUND: 'Restaurant not found',
// };

import { secret, config } from '../middlewares/jwtConfig';

// import IToken from '../interfaces/IToken';

const MESSAGES = {
//   USER_NOT_FOUND: 'User not found',
  UNAUTHORIZED: 'Invalid email or password',
  USER_EXISTS: 'User already exists',
  USERNAME_PASSWORD_INVALID: 'Username or password invalid',
//   FORBIDDEN: 'You are not allowed to take this action',
};

export async function getAll() {
  const data = await productModel.getAll();
  return { status: 200, data };
}

export async function getAllOrders() {
  const data = await productModel.getAllOrders();
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
  // const data = { token, ...payload };
  const data = { token };
  return { status: 201, data };
}

export async function login(userCredentials: UserCredentials) {
  const data = await productModel
    .getByUsernameAndPassword(userCredentials.username, userCredentials.password);

  if (data === null || data.password !== userCredentials.password) {
    return { status: 401, error: { message: MESSAGES.USERNAME_PASSWORD_INVALID } };
  }

  const token = jwt.sign({ data: { id: data.id, username: data.username } }, secret, config);
  return { status: 200, data: { token } };
}

export async function createOrder(order: IOrder) {
  const data = await productModel.createOrder(order);
  return { status: 201, data };
}
