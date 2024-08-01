import {CreateDeliveryOption} from "../../modules/admin/shared/interfaces/CreateDeliveryOption";

export interface DeliveryOptionDto extends CreateDeliveryOption {
  slug: string,
  isAvailable: boolean,
}
