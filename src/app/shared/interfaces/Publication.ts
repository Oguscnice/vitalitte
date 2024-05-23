import { CreatePublication } from "src/app/modules/admin/interfaces/Publication";
import { Pagination } from "./Pagination";

export interface PublicationDto extends CreatePublication {
  slug : string,
  createdAt : Date,
  spotlighted : boolean,
}

export interface PublciationPaginated {
  valueSearch: string,
  pagination: Pagination
}