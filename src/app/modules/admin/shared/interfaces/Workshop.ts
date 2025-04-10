import {WorkshopDto} from "../../../../shared/interfaces/Workshop";
import {FileDto} from "../../../../shared/interfaces/FileDto";

export interface CreateWorkshop {
  title : string,
  description : string,
  date : Date,
  address : string,
  price : number,
  pictureDto: FileDto
  registrations : number
}

export interface WorkshopDisponibilities {
  workshopSlug: WorkshopDto['slug'],
  registrationsReserved: number
}
