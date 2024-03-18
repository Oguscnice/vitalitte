export interface CreateMaterial {
    name : string,
    price : number,
    description : string,
    picture : string,
    materialType : string;
}

export interface MaterialDto extends CreateMaterial {
  slug : string,
  isAvalaible : boolean
}