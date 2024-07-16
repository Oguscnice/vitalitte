export interface UserCheckoutInfo {
  name: {
    prefix: string,
    given_name: string,
    surname: string
  }
  email_address: string,
  address: {
    country_code: string,
    address_line_1: string,
    address_line_2: string,
    admin_area_1: string,
    postal_code: string
  },
  phone: {
    phone_number: {
      national_number: string,
    }
  }
}
