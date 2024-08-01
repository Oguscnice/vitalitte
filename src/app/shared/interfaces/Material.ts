import { CreateMaterial } from "../../modules/admin/shared/interfaces/CreateMaterial";


export interface MaterialDto extends CreateMaterial {
  slug : string,
  available : boolean,
  availableForCustomization: boolean
}
