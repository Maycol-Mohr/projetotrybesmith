import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { Product, IProduct } from '../interfaces';

export async function getAll(): Promise<Product[]> {
  const query = 'SELECT * FROM Trybesmith.products';

  const [data] = await connection.execute(query);

  return data as Product[];
}

export async function createProduct(product: IProduct): Promise<Product> {
  const { name, amount } = product;

  const query = `INSERT INTO Trybesmith.products (name, amount)
    VALUES (?, ?)`;
  const values = [name, amount];

  const [result] = await connection.execute<ResultSetHeader>(query, values);
  const { insertId: id } = result;

  const newProduct: Product = { id, ...product };
  return newProduct;
}
