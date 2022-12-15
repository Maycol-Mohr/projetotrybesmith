import jwt from 'jsonwebtoken';
import { UserCredentials } from '../interfaces';
import * as userModel from '../models/userModel';

import { secret, config } from '../middlewares/jwtConfig';

// import IToken from '../interfaces/IToken';

const MESSAGES = {
//   USER_NOT_FOUND: 'User not found',
  UNAUTHORIZED: 'Invalid email or password',
  USER_EXISTS: 'User already exists',
  USERNAME_PASSWORD_INVALID: 'Username or password invalid',
//   FORBIDDEN: 'You are not allowed to take this action',
};

export default async function createUser(user: UserCredentials) {
  const userExists = await userModel.getByUsername(user.username);
  if (userExists) {
    return { status: 400, error: { message: MESSAGES.USER_EXISTS } };
  }

  const payload = await userModel.default(user);
  const token = jwt.sign({ payload }, secret, config);
  // const data = { token, ...payload };
  const data = { token };
  return { status: 201, data };
}

export async function login(userCredentials: UserCredentials) {
  const data = await userModel
    .getByUsernameAndPassword(userCredentials.username, userCredentials.password);

  if (data === null || data.password !== userCredentials.password) {
    return { status: 401, error: { message: MESSAGES.USERNAME_PASSWORD_INVALID } };
  }

  const token = jwt.sign({ data: { id: data.id, username: data.username } }, secret, config);
  return { status: 200, data: { token } };
}
