import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-formulaire-envoye',
  templateUrl: './formulaire-envoye.component.html',
  styleUrls: ['./formulaire-envoye.component.scss']
})
export class FormulaireEnvoyeComponent extends BaseComponent{
  titleParentFormSend = "Formulaire envoyé !"
  backgroundImageParentHome = "../../../assets/images/figma/contact.jpg"
}
