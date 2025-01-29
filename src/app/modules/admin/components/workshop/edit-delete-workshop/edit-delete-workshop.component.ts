import {Component, inject, OnInit} from '@angular/core';
import { WorkshopDto } from 'src/app/shared/interfaces/Workshop';
import {NgClass, TitleCasePipe} from '@angular/common';
import { RouterLink } from '@angular/router';
import { AddEuroCurrencyPipe } from 'src/app/shared/services/pipes/add-euro-currency.pipe';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import {AdminWorkshopSignalService} from "../../../shared/services/admin-workshop-signal.service";
import {ModalSignalService} from "../../../../../shared/services/modal-signal.service";
import {
  ChangePageButtonsPagination
} from "../../../../../components/change-page-buttons-pagination/change-page-buttons-pagination.component";
import {DataSignalService} from "../../../../../shared/services/data-signal.service";
import {BaseComponent} from "../../../../../base.component";
import {PaginationSignalService} from "../../../../../shared/services/pagination-signal.service";
import {
  ChangeSizePaginationAndValueSearchComponent
} from "../../../../../components/change-size-pagination-and-value-search/change-size-pagination-and-value-search.component";
import {FileService} from "../../../../../shared/services/file.service";

@Component({
  standalone: true,
  imports: [ NgClass, TitleCasePipe, RouterLink, AddEuroCurrencyPipe, ModalComponent, ChangePageButtonsPagination, ChangeSizePaginationAndValueSearchComponent],
  selector: 'app-edit-delete-workshop',
  templateUrl: './edit-delete-workshop.component.html',
  styles: [ `@import "../../../scss/admin-general.scss"; `]
})
export class EditDeleteWorkshopComponent extends BaseComponent implements OnInit {

  private dataSignal = inject(DataSignalService);
  private adminWorkshopSignal = inject(AdminWorkshopSignalService);
  private modalSignal = inject(ModalSignalService);
  fileService = inject(FileService);

  workshopsDateToCome$= this.dataSignal.$workshopsDateToCome;
  workshopsPastDate$= this.dataSignal.$workshopsPastDate;
  disponibilities$ = this.dataSignal.$workshopsRegistrationsReserved;

  isTableVisible: boolean = true;

  ngOnInit(): void {
    this.dataSignal.getWorkshopsByDateToCome();
    this.dataSignal.getWorkshopsByPastDate();
  }

  onValuePageChange(event : string): void {
    this.dataSignal.getWorkshopsByPastDate();
  }

  openModalWithDescription(workshopDescription : WorkshopDto['description']): void {
    this.modalSignal.showModal(workshopDescription, false);
  }

  changeAvailability = (workshop : WorkshopDto) => this.adminWorkshopSignal.changeAvailability(workshop);
  delete = (workshopSelected : WorkshopDto) => this.adminWorkshopSignal.confirmationModalForDeleteWorkshop(workshopSelected);
}
