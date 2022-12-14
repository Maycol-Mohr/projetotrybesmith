export interface IProduct {
  name: string;
  amount: string;
  orderId?: number;
}
  
export interface Product extends IProduct {
  id: number;
}

export interface UserCredentials {
  username: string;
  vocation: string;
  level: number;
  password: string;
}

export interface User extends UserCredentials {
  id: number;
}

export interface IOrder {
  id: number;
  userId: number;
  productsIds: number[];
}