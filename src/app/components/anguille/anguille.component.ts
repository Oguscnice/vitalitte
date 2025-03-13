import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AnguilleSignalService } from '../../shared/services/anguille-signal.service';

@Component({
  standalone : true,
  imports : [ NgClass ],
  selector: 'anguille',
  template: ` <div class="messages-anguille">
              @for (message of messages(); track message) {
                <p class="anguille" [ngClass]="{'hors-roche': message.isMessageVisible, 'sous-roche': !message.isMessageVisible}">
                  {{ message.message }}
                </p>
              }
              </div>`,
  styles: [`@use "../../scss/variables.scss" as variablesScss;
            @use "../../scss/buttons.scss";

            .messages-anguille {
              position: fixed;
              top : calc(var(--height-header) + #{variablesScss.$normal-margin});
              right: -300px;
              width: 600px;
              z-index : 999;

              p {
                position: relative;
                max-width: 300px;
                background-color: variablesScss.$lilac-light;
                padding : variablesScss.$triple-padding;
                margin-bottom: variablesScss.$half-margin;
                transition: right 1s linear;
                word-break: normal;
                overflow-y: hidden;
                @include variablesScss.outline-picture;
              }
              .hors-roche {
                animation: slideInFromRight 1s ease-out forwards;
              }
              .sous-roche {
                animation: slideOutToRight 0.4s ease-out forwards;
              }
            }

            @keyframes slideInFromRight {
              0% {
                right : -300px;
                height: max-content;
              }
              100% {
                right : 0vw;
                height: max-content;
              }
            }

            @keyframes slideOutToRight {
              0% {
                height: max-content;
                right : 0vw;
                padding : variablesScss.$fourth-padding;
                margin-bottom: variablesScss.$half-margin;
              }
              100% {
                height: 0px;
                right : -300vw;
                padding : 0px;
                margin-bottom: 0px;
              }
            }
          `]
})
export class AnguilleComponent {

  private anguilleSignal = inject(AnguilleSignalService);

  messages = this.anguilleSignal.$messages;
}
