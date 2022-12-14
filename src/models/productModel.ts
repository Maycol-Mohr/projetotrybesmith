import { ResultSetHeader } from 'mysql2';

import connection from './connection';
// import { IProduct, Product, IUser, User } from '../interfaces';
import { Product, IProduct } from '../interfaces';
// import { IUser, User } from '../interfaces';
// import { Product } from '../interfaces';

export async function getAll(): Promise<Product[]> {
  const query = 'SELECT * FROM Trybesmith.products';

  const [data] = await connection.execute(query);

  return data as Product[];
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

// export async function getById(id: number): Promise<Restaurant | null> {
//   const query = 'SELECT * FROM Restaurants WHERE id = ?';
//   const values = [id];

//   const [data] = await connection.execute(query, values);
//   const [restaurant] = data as Restaurant[];

//   return restaurant || null;
// }

// export async function createUser(user: IUser): Promise<User> {
//   const { username, vocation, level, password } = user;

//   const query = 'INSERT INTO users (username, vocation, level, password) VALUES (?, ?, ?, ?)';
//   const values = [username, vocation, level, password];

//   const [result] = await connection.execute<ResultSetHeader>(query, values);
//   const { insertId: id } = result;

//   const newUser: User = { id, username, vocation, level, password };
//   return newUser;
// }

// export async function getByUsername(username: string): Promise<User | null> {
//   const query = 'SELECT * FROM Users WHERE username = ?';
//   const values = [username];

//   const [data] = await connection.execute(query, values);
//   const [user] = data as User[];

//   return user || null;
// }

// export async function update(id: number, restaurant: IRestaurant): Promise<Restaurant> {
//   const { name, category, openingTime, closingTime } = restaurant;

//   const query = `UPDATE Restaurants SET name = ?, category = ?,
//     openingTime = ?, closingTime = ? WHERE id = ?`;
//   const values = [name, category, openingTime, closingTime, id];

//   await connection.execute(query, values);

//   const editedRestaurant: Restaurant = { id, ...restaurant };
//   return editedRestaurant;
// }

// export async function remove(id: number): Promise<Restaurant | null> {
//   const restaurantToBeDeleted = await getById(id);
//   if (!restaurantToBeDeleted) return null;

//   const query = 'DELETE FROM Restaurants WHERE id = ?';
//   const values = [id];

//   await connection.execute(query, values);

//   return restaurantToBeDeleted;
// }

// export async function getAllOpen(): Promise<Restaurant[]> {
//   const query = `SELECT * FROM Restaurants WHERE openingTime <= time(NOW())
//     AND closingTime >= time(NOW())`;

//   const [data] = await connection.execute(query);

//   return data as Restaurant[];
// }