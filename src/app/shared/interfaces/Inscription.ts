import { WorkshopDto } from "./Workshop";

export interface CreateInscription {
  firstname : string,
  lastname : string,
  phone : Date,
  email : string,
  workshopDto : WorkshopDto,
}