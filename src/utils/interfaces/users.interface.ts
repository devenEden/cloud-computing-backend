export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  password: string;
}

export interface IRegisterReq {
  name: string;
  email: string;
  avatar?: string;
  password: string;
}

export interface ILoginReq {
  email: string;
  password: string;
}
