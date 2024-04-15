import { CreateWorkshop } from "src/app/modules/admin/interfaces/Workshop";

export interface WorkshopDto extends CreateWorkshop {
  slug : string,
  available : boolean,
}