import {CreateDeliveryOption} from "../../modules/admin/shared/interfaces/DeliveryOption";

export interface DeliveryOptionDto extends CreateDeliveryOption {
  slug: string,
  isAvailable: boolean,
}
