import {FileDto} from "../../../../shared/interfaces/FileDto";

export interface CreatePublication {
  title : string,
  description : string,
  pictureDto: FileDto
}
