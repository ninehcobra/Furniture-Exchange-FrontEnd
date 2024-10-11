import { IRole } from './role.model';

export interface IUser {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
  verificationToken: string;
}
export interface IGetUserInfoResponse extends IUser {}
