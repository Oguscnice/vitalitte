import {FileDto} from "../../../../shared/interfaces/FileDto";

export interface CreateCategory {
  name: string,
  description: string,
  pictureDto: FileDto
}
