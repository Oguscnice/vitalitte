import {Component, inject, OnInit, Signal} from '@angular/core';
import { BaseComponent } from '../../../base.component';
import { WorkshopDto } from '../../../shared/interfaces/Workshop';
import {PaginationSignalService} from "../../../shared/services/pagination-signal.service";
import {DataSignalService} from "../../../shared/services/data-signal.service";
import {WorkshopDisponibilities} from "../../../modules/admin/shared/interfaces/Workshop";

@Component({
  standalone: false,
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styles: [`
            @import "../../../scss/variables.scss";

            .workshops {
              flex-direction: column;
            }

            .dropdown-container {
              margin-bottom: $half-margin;
              .input-and-arrow {
                .arrow-icone {
                  margin-top : 0px;
                }
              }
            }

            .choice-page {
              margin-top: $normal-margin;
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
  workshopsWithDateToCome: Signal<WorkshopDto[]> = this.dataSignal.$workshopsDateToCome;
  workshopsWithPastDate: Signal<WorkshopDto[]> = this.dataSignal.$workshopsPastDate;
  disponibilities: Signal<WorkshopDisponibilities[]> = this.dataSignal.$workshopsRegistrationsReserved;

  ngOnInit(): void {
    this.dataSignal.getWorkshopsByDateToCome();
    this.getWorkshopsByPastDateAndCounter();
    this.subscribeToWorkshopCounterSignal();
  }

  subscribeToWorkshopCounterSignal(): void {
    this.subscriptions.push(
      this.dataSignal.$workshopsCounterPastDate.subscribe((counter:number): void => this.paginationSignal.setCounterItem(counter))
    )
  }

  onValuePageChange(event : string): void {
    this.getWorkshopsByPastDateAndCounter();
  }

  inscriptionsReservedByWorkshopSlug(workshopSlug: WorkshopDto['slug']): number {
    for (let item of this.disponibilities()) {
      if (item.workshopSlug === workshopSlug) {
        return item.registrationsReserved;
      }
    }
    return 0;
  }

  private getWorkshopsByPastDateAndCounter(): void {
    this.dataSignal.getWorkshopsByPastDate();
    this.dataSignal.getCounterWorkshopsByPastDate();
  }
}
