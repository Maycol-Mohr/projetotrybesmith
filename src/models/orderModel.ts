import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { IOrder } from '../interfaces';

export default async function createOrder(order: IOrder): Promise<IOrder> {
  const { userId, productsIds } = order;

  const query = `INSERT INTO Trybesmith.orders (user_id)
    VALUES (?)`;

  const [{ insertId }] = await connection.execute<ResultSetHeader>(query, [userId]);
  await Promise.all(productsIds.map(async (id) => connection
    .execute('UPDATE Trybesmith.products SET order_id = ? WHERE id = ?', [insertId, id])));

  const newOrder: IOrder = { userId, productsIds };
  return newOrder;
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