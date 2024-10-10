export interface ILoginPayload {
  username?: string;
  email?: string;
  password: string;
}

export interface IRegisterPayload {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRegisterResponse extends ILoginResponse {}
