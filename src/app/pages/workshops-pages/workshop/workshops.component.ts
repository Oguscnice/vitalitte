import { Component, inject } from '@angular/core';
import { BaseComponent } from '../../../base.component';
import { WorkshopDto } from '../../../shared/interfaces/Workshop';
import { ApiRequestsService } from '../../../shared/services/api-requests.service';

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
export class WorkshopsComponent extends BaseComponent {

  private apiRequestsService = inject(ApiRequestsService);

  protected backgroundImageParent = "../../../assets/images/figma/atelier.jpg";
  protected workshopsWithDateToCome! : WorkshopDto[];
  protected workshopsWithPastDate! : WorkshopDto[];
  protected disponibilities : {workshopSlug : WorkshopDto['slug'], inscriptions : number}[] = []

  protected pageNumber: number = 0;
  protected size: number = 10;
  protected isDropdownOpen: boolean = false;
  
  private counterWorkshops: number = 0;
  protected modalVisible : boolean = false;
  protected modalText! : string;

  ngOnInit(): void {
    this.getWorkshopsByDateToCome();
    this.getWorkshopsByPastDateAndCounter();
  }

  toggleDropdown(value: boolean): void {
    this.isDropdownOpen = value;
  }

  updateSizeValue(value: number): void {
    this.size = value;
    this.getWorkshopsByPastDateAndCounter();
    this.toggleDropdown(false);
  }

  changePage(choice : 'first' | 'prev' | 'next' | 'last'): void {
    if(choice === 'first') {
      this.pageNumber = 0;
    } else if (choice === 'last') {
      this.pageNumber = this.calcLastPage() - 1;
    } else if (choice === 'prev') {
      this.pageNumber -= this.pageNumber < 1 ? 0 : 1
    } else if (choice === 'next') {
      this.pageNumber += this.pageNumber < this.calcLastPage() - 1 ? 1 : 0
    }
    this.getWorkshopsByPastDate();
  }

  calcLastPage(): number {
    return Math.floor(this.counterWorkshops / this.size) + (this.counterWorkshops % this.size === 0 ? 0 : 1)
  }

  inscriptionsReservedByWorkshopSlug(workshopSlug: WorkshopDto['slug']): number {
    for(let item of this.disponibilities){
      if(item.workshopSlug === workshopSlug){
        return item.inscriptions;
      }
    }
    return 0;
  }

  responseForModal(response: boolean): void {
    this.modalVisible = false;
  }

  private getWorkshopsByPastDateAndCounter(): void {
    this.getWorkshopsByPastDate();
    this.getCounterWorkshopsByPastDate();
  }

  private getWorkshopsByDateToCome(): void {
    this.subscriptions.push(
      this.apiRequestsService.getWorkshopsByDateToCome().subscribe({
        next: (workshops) => {
          this.workshopsWithDateToCome = workshops;

          for(let workshop of workshops){
            this.getCounterDisponibilities(workshop.slug);
          }
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  private getWorkshopsByPastDate(): void {    
    this.subscriptions.push(
      this.apiRequestsService.getWorkshopsByPastDate({page: this.pageNumber, size: this.size}).subscribe({
        next: (workshops) => {
          this.workshopsWithPastDate = workshops;

          for(let workshop of workshops){
            this.getCounterDisponibilities(workshop.slug);
          }
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  private getCounterWorkshopsByPastDate(): void {
    this.subscriptions.push(
      this.apiRequestsService.getCounterWorkshopsByPastDate().subscribe({
        next: (counter) => this.counterWorkshops = counter,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  private getCounterDisponibilities(workshopSlugToFind: WorkshopDto['slug']): void {
    if(!this.disponibilities.some(item => item.workshopSlug === workshopSlugToFind)){
      this.subscriptions.push(
        this.apiRequestsService.getCounterWorkshopInscriptions(workshopSlugToFind).subscribe({
          next: (counter) => this.disponibilities.push({workshopSlug : workshopSlugToFind, inscriptions : counter}),
          error: (err) => (this.changeMessage(err.error.message))
        })
      )
    }
  }
}
