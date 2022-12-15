interface IToken {
  payload: {
    id: number;
    username: string;
    password?: string;
  };
  iat: number;
  exp: number;
}

// interface IToken {
//   payload: {
//     id: number;
//     username: string;
//     vocation: string;
//     level: number;
//     password: string;
//   };
//   iat: number;
//   exp: number;
// }
  
// export default IToken;

// export interface UserCredentials2 {
//   username: string;
//   password: string;
// }

// export interface UserCredentialsId {
//   id: number;
// }

// interface IToken {
//   payload: {
//     id: number;
//     name: string;
//     email: string;
//     password: string;
//   };
//   iat: number;
//   exp: number;
// }

export default IToken;