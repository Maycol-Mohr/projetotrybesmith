import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { UserCredentials, User } from '../interfaces';

export default async function createUser(user: UserCredentials): Promise<User> {
  const { username, vocation, level, password } = user;
  
  const query = `INSERT INTO Trybesmith.users (username, vocation, level, password) 
    VALUES (?, ?, ?, ?)`;
  const values = [username, vocation, level, password];
  
  const [result] = await connection.execute<ResultSetHeader>(query, values);
  const { insertId: id } = result;
  
  const newUser: User = { id, username, vocation, level, password };
  return newUser;
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

export async function getAll(): Promise<User[]> {
  const query = 'SELECT * FROM Trybesmith.users';

  const [data] = await connection.execute(query);

  return data as User[];
}

export async function getById(id: number): Promise<User | null> {
  const query = 'SELECT * FROM Trybesmith.users WHERE id = ?';
  const values = [id];

  const [data] = await connection.execute(query, values);
  const [user] = data as User[];

  return user || null;
}