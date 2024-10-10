import { IRole } from './role.model';

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: IRole;
}
export interface IGetUserInfoResponse extends IUser {}

export interface IGetUser {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: IUser[];
}
