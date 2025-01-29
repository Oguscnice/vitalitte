import { DatePipe, NgClass } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WorkshopDto } from '../../shared/interfaces/Workshop';
import {CustomCurrencyPipe} from "../../shared/services/pipes/custom-currency.pipe";
import {FileService} from "../../shared/services/file.service";

@Component({
  selector: 'app-workshop-thumbnail',
  standalone: true,
  imports: [DatePipe, NgClass, RouterLink, CustomCurrencyPipe],
  templateUrl: './workshop-thumbnail.component.html',
  styles: [`
            @import "../../scss/variables.scss";
            @import "../../scss/buttons.scss";

            .workshop {
              @include outline-picture;
              height: 160px;
              position: relative;
              overflow: hidden;
              margin-top: $half-margin;

              img {
                object-fit: cover;
                width: 160px;
                height: 160px;
              }

              .workshop-description {
                padding: $normal-padding;
                width: 100%;

                p {
                  margin-top: $half-padding;
                  width: 100%;
                  text-align: center;
                }

                .workshop-date {
                  font-size: $normal-font-size;
                }

                .workshop-address {
                  font-size: $normal-font-size;
                }

                .registration {
                  font-size: $normal-font-size;
                  max-width: max-content;
                }
                .btn-normal {
                  font-size: $normal-font-size;
                  padding: $normal-padding;
                  margin: calc($half-margin / 2);
                }
              }

              .workshop-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: $lilac-dark-transparent;

                .workshop-unavailable {
                  @include text-shadow(0.4px, $black);
                  color: white;
                  font-size: 2em;
                  font-weight: bold;
                  transform: rotate(-20deg);
                  letter-spacing: 4px;
                }
              }
            }

            .unavailable {
              border: 2px solid $grey;
              box-shadow: 4px 4px 4px rgba($black, 0.8);

              .workshop-description {
                p {
                  color: $grey;
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
                  }

                  .workshop-address {
                    font-size: $normal-font-size;
                  }

                  .btn-normal {
                    margin: calc($half-margin / 4);
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
