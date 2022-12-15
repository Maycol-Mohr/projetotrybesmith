import { IOrder } from '../interfaces';
import * as orderModel from '../models/orderModel';

export default async function createOrder(order: IOrder) {
  const data = await orderModel.default(order);
  return { status: 201, data };
}

export async function getAllOrders() {
  const data = await orderModel.getAllOrders();
  return { status: 200, data };
}