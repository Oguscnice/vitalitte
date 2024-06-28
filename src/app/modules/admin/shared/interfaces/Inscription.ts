import { CreateInscription } from "../../../../shared/interfaces/Inscription";

export interface InscriptionDto extends CreateInscription {
  slug : string,
}
