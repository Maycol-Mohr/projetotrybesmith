interface IToken {
  data: {
    id: number;
    username: string;
    password?: string;
  };
  iat: number;
  exp: number;
}

export default IToken;