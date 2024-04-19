import { CreatePublication } from "src/app/modules/admin/interfaces/Publication";

export interface PublicationDto extends CreatePublication {
  slug : string,
  createdAt : Date,
  spotlighted : boolean,
}