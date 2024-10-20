export interface IUser {
  created_at: string
  deleted_at: string | null
  id: string
  CCCD: string | null
  email: string
  email_verified: boolean
  password: string
  first_name: string
  last_name: string
  sex: string
  image_url: string
  image_id: string
  phone_number: string
  address_line1: string | null
  address_line2: string | null
  role: string
  updated_at: string
  account: {
    id: string
    user_id: string
    balance: number
    created_at: string
    updated_at: string
    deleted_at: string | null
  }
}
