import { DatePipe, NgClass } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WorkshopDto } from '../../shared/interfaces/Workshop';
import {CustomCurrencyPipe} from "../../shared/services/pipes/custom-currency.pipe";
import {FileService} from "../../shared/services/file.service";

@Component({
  selector: 'app-workshop-thumbnail',

  imports: [DatePipe, NgClass, RouterLink, CustomCurrencyPipe],
  templateUrl: './workshop-thumbnail.component.html',
  styles: [`
            @use "../../scss/variables.scss" as variablesScss;
            @use "../../scss/buttons.scss" as buttonsScss;

            .workshop {
              @include variablesScss.outline-picture;
              height: 160px;
              position: relative;
              overflow: hidden;
              margin-top: variablesScss.$half-margin;

              img {
                object-fit: cover;
                width: 160px;
                height: 160px;
              }

              .workshop-description {
                padding: variablesScss.$normal-padding;
                width: 100%;

                p {
                  margin-top: variablesScss.$half-padding;
                  width: 100%;
                  text-align: center;
                }

                .workshop-date {
                  font-size: variablesScss.$normal-font-size;
                }

                .workshop-address {
                  font-size: variablesScss.$normal-font-size;
                }

                .registration {
                  font-size: variablesScss.$normal-font-size;
                  max-width: max-content;
                }
                .btn-normal {
                  font-size: variablesScss.$normal-font-size;
                  padding: variablesScss.$normal-padding;
                  margin: calc( (#{variablesScss.$half-margin}) / 2);
                }
              }

              .workshop-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: variablesScss.$lilac-dark-transparent;

                .workshop-unavailable {
                  @include variablesScss.text-shadow(0.4px, variablesScss.$black);
                  color: white;
                  font-size: 2em;
                  font-weight: bold;
                  transform: rotate(-20deg);
                  letter-spacing: 4px;
                }
              }
            }

            .unavailable {
              border: 2px solid variablesScss.$grey;
              box-shadow: 4px 4px 4px rgba(variablesScss.$black, 0.8);

              .workshop-description {
                p {
                  color: variablesScss.$grey;
                }
              }
            }

            // Tablettes vers ordinateurs portables :
            @media screen and (min-width: 992px) {
              .workshop {
                height: 180px;
                width: 380px;

                img {
                  width: 180px;
                  height: 180px;
                }

                .workshop-description {

                  .workshop-title {
                    font-weight: bold;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-family: variablesScss.$font-family-text;
                  }

                  .workshop-address {
                    font-size: variablesScss.$normal-font-size;
                  }

                  .btn-normal {
                    margin: calc((#{variablesScss.$half-margin}) / 4);
                    color: variablesScss.$black;
                    @include variablesScss.text-shadow (0px, variablesScss.$black);
                    letter-spacing: 2px;
                  }
                }
              }
            }
          `]
})
export class WorkshopThumbnailComponent {

  private currentDate = new Date();
  fileService = inject(FileService);

  @Input() workshop! : WorkshopDto;
  @Input() disponibility! : number;

  isFutureDate(workshopDate: WorkshopDto['date']): boolean {
    return new Date(workshopDate) > this.currentDate;
  }
}
