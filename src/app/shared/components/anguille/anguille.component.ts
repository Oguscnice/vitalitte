import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone : true,
  imports : [CommonModule],
  selector: 'anguille',
  template: ` <p class="anguille" [ngClass]="message ? 'hors-roche' : 'sous-roche' ">
                {{ message }}
              </p> `,
  styles: [`
            @import "../../../scss/variables.scss";
            @import "../../../scss/buttons.scss";

            .anguille {
              position: fixed;
              top : calc($normal-margin + var(--height-header));
              background-color: $lilac;
              padding : $fourth-padding;
              max-width: 80vw;
              transition: right linear 1s;
            }

            .hors-roche {
              right : 0vw;
            }

            .sous-roche {
              right : -80vw;
            }
          `]
})
export class AnguilleComponent {
  @Input() message! : string;
}
