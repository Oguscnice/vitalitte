import {WorkshopDto} from "../../../../shared/interfaces/Workshop";

export interface CreateWorkshop {
  title : string,
  description : string,
  date : Date,
  address : string,
  price : number,
  picture : string,
  pictureThumbnail : string,
  registrations : number
}

export interface WorkshopDisponibilities {
  workshopSlug: WorkshopDto['slug'],
  disponibilities: number
}
