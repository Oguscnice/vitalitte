import { CreateInscription } from "src/app/shared/interfaces/Inscription";

export interface InscriptionDto extends CreateInscription {
  slug : string,
}