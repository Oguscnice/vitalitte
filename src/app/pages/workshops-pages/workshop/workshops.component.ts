import {Component, inject, OnInit} from '@angular/core';
import { BaseComponent } from '../../../base.component';
import { WorkshopDto } from '../../../shared/interfaces/Workshop';
import {PaginationSignalService} from "../../../shared/services/pagination-signal.service";
import {DataSignalService} from "../../../shared/services/data-signal.service";

@Component({
  standalone: false,
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styles: [`
            @use "../../../scss/variables.scss" as variablesScss;
            @use "../../../scss/buttons.scss";

            section {
              h2 {
                color: variablesScss.$black;
              }
              p {
                margin-top: variablesScss.$half-margin;
              }
            }

            .dropdown-container {
              margin-bottom: variablesScss.$half-margin;
              .input-and-arrow {
                .arrow-icon {
                  margin-top : 0px;
                }
              }
            }

            .choice-page {
              margin-top: variablesScss.$normal-margin;
              width: 320px;
            }

            // Tablettes vers ordinateurs portables :
            @media screen and (min-width: 992px) {
              .workshops {
                flex-direction: row;
              }
            }
  `]
})
export class WorkshopsComponent extends BaseComponent implements OnInit {

  private dataSignal = inject(DataSignalService);
  private paginationSignal = inject(PaginationSignalService);

  backgroundImageParent: string = "../../../assets/images/figma/atelier.jpg";
  private disponibilities$ = this.dataSignal.$workshopsRegistrationsReserved;
  workshopsWithDateToCome$ = this.dataSignal.$workshopsDateToCome;
  workshopsWithPastDate$ = this.dataSignal.$workshopsPastDate;

  ngOnInit(): void {
    this.dataSignal.getWorkshopsByDateToCome();
    this.dataSignal.getWorkshopsByPastDate();
  }

  onValuePageChange(event : string): void {
    this.dataSignal.getWorkshopsByPastDate();
  }

  inscriptionsReservedByWorkshopSlug(workshopSlug: WorkshopDto['slug']): number {
    for (const ITEM of this.disponibilities$()) {
      if (ITEM.workshopSlug === workshopSlug) {
        return ITEM.registrationsReserved;
      }
    }
    return 0;
  }
}
