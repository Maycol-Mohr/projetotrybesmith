import { IProduct } from '../interfaces';
import * as productModel from '../models/productModel';

export async function getAll() {
  const data = await productModel.getAll();
  return { status: 200, data };
}

export async function createProduct(product: IProduct) {
  const data = await productModel.createProduct(product);
  return { status: 201, data };
}

export async function getById(id: number) {
  const data = await productModel.getById(id);

  if (data === null) return { status: 404, error: { message: 'Product Not Found' } };
  return { status: 200, data };
}
