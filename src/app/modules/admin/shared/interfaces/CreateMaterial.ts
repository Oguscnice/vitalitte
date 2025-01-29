import {FileDto} from "../../../../shared/interfaces/FileDto";

export interface CreateMaterial {
  name: string,
  price: number,
  description: string,
  pictureDto: FileDto,
  materialType: string;
}
