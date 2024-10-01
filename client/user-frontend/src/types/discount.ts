export interface ICreateDiscountPayload {
  name: string
  description: string
  min_price: string
  max_price: string
  discount_percent: string
  order: string
}

export interface IDiscount {
  id: number
  name: string
  description: string
  min_price: string
  max_price: string
  discount_percent: string
  order: string
}
