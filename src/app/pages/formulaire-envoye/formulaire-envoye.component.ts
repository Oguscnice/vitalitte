import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';

@Component({
  standalone: false,
  selector: 'app-formulaire-envoye',
  template: `
              <app-h1 [titleChild]="'Formulaire envoyé !'" [backgroundImageChild]="backgroundImageParentHome"/>
              <div>
                <h2>Votre formulaire a été envoyé</h2>
                <p>Nous mettons tout en oeuvre pour y répondre au plus vite.</p>
              </div>
            `,
  styles: [`
            @import "../../scss/variables.scss";
            @import "../../scss/buttons.scss";
            @import "../../../styles.scss";

            .form-send-page{
              height: calc(100vh - (var(--height-header) + var(--height-footer) + $double-padding) + 2px);
              div{
                p{
                  padding: $fourth-padding;
                }
              }
            }
  `]
})
export class FormulaireEnvoyeComponent extends BaseComponent{
  backgroundImageParentHome = "../../../assets/images/figma/contact.jpg"
}
