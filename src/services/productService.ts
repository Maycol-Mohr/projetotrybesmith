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
