import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { Product, IProduct, UserCredentials, User, IOrder } from '../interfaces';

export async function getAll(): Promise<Product[]> {
  const query = 'SELECT * FROM Trybesmith.products';

  const [data] = await connection.execute(query);

  return data as Product[];
}

export async function getAllOrders(): Promise<IOrder[]> {
  const query = `SELECT ord.id as id, ord.user_id as userId, JSON_ARRAYAGG(prod.id) as productsIds
  FROM Trybesmith.orders as ord
  INNER JOIN Trybesmith.products as prod
  ON prod.order_id = ord.id
  GROUP BY ord.id, ord.user_id`;

  const [data] = await connection.execute(query);

  return data as IOrder[];
}

export async function create(product: IProduct): Promise<Product> {
  const { name, amount } = product;

  const query = `INSERT INTO Trybesmith.products (name, amount)
    VALUES (?, ?)`;
  const values = [name, amount];

  const [result] = await connection.execute<ResultSetHeader>(query, values);
  const { insertId: id } = result;

  const newProduct: Product = { id, ...product };
  return newProduct;
}

export async function getByUsername(username: string): Promise<User | null> {
  const query = 'SELECT * FROM Trybesmith.users WHERE username = ?';
  const values = [username];

  const [data] = await connection.execute(query, values);
  const [user] = data as User[];

  return user || null;
}

export async function 
getByUsernameAndPassword(username: string, password: string): Promise<User | null> {
  const query = 'SELECT * FROM Trybesmith.users WHERE username = ? AND password = ?';
  const values = [username, password];

  const [data] = await connection.execute(query, values);
  const [user] = data as User[];

  return user || null;
}

export async function createUser(user: UserCredentials): Promise<User> {
  const { username, vocation, level, password } = user;

  const query = `INSERT INTO Trybesmith.users (username, vocation, level, password) 
  VALUES (?, ?, ?, ?)`;
  const values = [username, vocation, level, password];

  const [result] = await connection.execute<ResultSetHeader>(query, values);
  const { insertId: id } = result;

  const newUser: User = { id, username, vocation, level, password };
  return newUser;
}
