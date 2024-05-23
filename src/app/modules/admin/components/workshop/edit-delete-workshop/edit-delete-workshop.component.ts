import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WorkshopDto } from 'src/app/shared/interfaces/Workshop';
import { NgClass, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AddEuroCurrencyPipe } from 'src/app/shared/services/pipes/add-euro-currency.pipe';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  standalone: true,
  imports: [ NgClass, TitleCasePipe, RouterLink, AddEuroCurrencyPipe, ModalComponent ],
  selector: 'app-edit-delete-workshop',
  templateUrl: './edit-delete-workshop.component.html',
  styles: [ `@import "../../../scss/admin-general.scss"; `]
})
export class EditDeleteWorkshopComponent {

  @Input() workshops! : WorkshopDto[];
  @Output() changeAvailabilityWorkshop: EventEmitter<WorkshopDto> = new EventEmitter();
  @Output() workshopToDelete: EventEmitter<WorkshopDto> = new EventEmitter();

  isTableVisible: boolean = true;

  modalVisible : boolean = false;
  modalText! : string;

  openModalWithDescription(workshopDescription : WorkshopDto['description']): void{
    this.modalVisible = true;
    this.modalText = workshopDescription;
  }

  responseForModal(response: boolean): void {
    this.modalVisible = false;
  }

  changeAvailability = (workshop : WorkshopDto) => this.changeAvailabilityWorkshop.emit(workshop);
  delete = (workshopSelected : WorkshopDto) => this.workshopToDelete.emit(workshopSelected);
}
