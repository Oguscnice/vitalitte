import { CreatePublication } from "../../modules/admin/shared/interfaces/Publication";

export interface PublicationDto extends CreatePublication {
  slug : string,
  createdAt : Date,
  spotlighted : boolean,
}
