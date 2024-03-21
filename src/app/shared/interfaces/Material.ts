import { CreateMaterial } from "src/app/modules/admin/interfaces/Material";


export interface MaterialDto extends CreateMaterial {
  slug : string,
  isAvalaible : boolean
}