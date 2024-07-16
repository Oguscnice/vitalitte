export interface CreateDeliveryOption {
  name: string,
  price: number,
  estimatedDeliveryTime: string,
  isExpress: boolean,
  carrier: string,
  description: string
}
