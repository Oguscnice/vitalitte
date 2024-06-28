import { CreateWorkshop } from "../../modules/admin/shared/interfaces/Workshop";

export interface WorkshopDto extends CreateWorkshop {
  slug : string,
  available : boolean,
}
