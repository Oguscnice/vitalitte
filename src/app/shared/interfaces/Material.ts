import { EMaterialType } from "./EMaterialType";

export interface CreateMaterial {
    name : string,
    price : number,
    description : string,
    picture : string,
    materialType : keyof typeof EMaterialType;
}

export interface MaterialDto extends CreateMaterial {
  slug : string,
  isAvalaible : boolean
}