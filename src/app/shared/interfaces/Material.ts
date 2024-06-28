import { CreateMaterial } from "../../modules/admin/shared/interfaces/Material";


export interface MaterialDto extends CreateMaterial {
  slug : string,
  available : boolean,
  availableForCustomization: boolean
}
