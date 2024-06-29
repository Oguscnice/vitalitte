import { NgClass } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { AnguilleSignalService } from '../../shared/services/anguille-signal.service';

@Component({
  standalone : true,
  imports : [ NgClass ],
  selector: 'anguille',
  template: ` <p class="anguille"
                 [ngClass]="message() ? 'hors-roche' : 'sous-roche' ">
                {{ message() }}
              </p> `,
  styles: [`@import "../../scss/variables.scss";
            @import "../../scss/buttons.scss";

            .anguille {
              position: fixed;
              top : calc($normal-margin + var(--height-header));
              background-color: $lilac-light;
              padding : $fourth-padding;
              max-width: 80vw;
              transition: right linear 1s;
              z-index : 999;
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

  private anguilleSignal = inject(AnguilleSignalService);

  message: Signal<string> = this.anguilleSignal.$message;
  
}
