export interface IUser {
  address_line1: string | null;
  address_line2: string | null;
  email: string;
  email_verified: boolean;
  first_name: string;
  last_name: string;
  id: string;
  phone_number: string;
  image_id: string;
  image_url: string;
  role: string;
  sex: string;
}
export interface IGetUserInfoResponse extends IUser {}
