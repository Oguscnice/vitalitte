import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';

@Component({
  standalone: false,
  selector: 'app-form-send',
  template: `
              <app-h1 [titleChild]="'Formulaire envoyé !'" [backgroundImageChild]="backgroundImageParentHome"/>
              <div>
                <h2>Votre formulaire a été envoyé</h2>
                <p>Nous mettons tout en oeuvre pour y répondre au plus vite.</p>
              </div>
            `,
  styles: [`
            @use "../../scss/variables.scss" as variablesScss;
            @use "../../scss/buttons.scss";
            @use "../../../styles.scss";

            .form-send-page{
              height: calc(100vh - (var(--height-header) + var(--height-footer) + #{variablesScss.$double-padding}) + 2px);
              div{
                p{
                  padding: variablesScss.$fourth-padding;
                }
              }
            }
  `]
})
export class FormSendComponent extends BaseComponent{
  backgroundImageParentHome = "../../../assets/images/figma/contact.jpg"
}
