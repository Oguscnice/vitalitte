import { CreateProduct } from "../../modules/admin/shared/interfaces/CreateProduct";

export interface ProductDto extends CreateProduct {
  slug: string,
  isAvailable: boolean,
}
