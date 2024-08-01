import { CreatePublication } from "../../modules/admin/shared/interfaces/CreatePublication";

export interface PublicationDto extends CreatePublication {
  slug : string,
  createdAt : Date,
  spotlighted : boolean,
}
