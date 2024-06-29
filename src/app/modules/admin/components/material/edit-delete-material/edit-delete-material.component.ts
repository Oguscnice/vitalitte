import {Component, inject, OnInit, Signal} from '@angular/core';
import { MaterialDto } from 'src/app/shared/interfaces/Material';
import { NgClass, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AddEuroCurrencyPipe } from 'src/app/shared/services/pipes/add-euro-currency.pipe';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import {DataSignalService} from "../../../../../shared/services/data-signal.service";
import {AdminMaterialSignalService} from "../../../shared/services/admin-material-signal.service";
import {
  ChangePageButtonsPagination
} from "../../../../../components/change-page-buttons-pagination/change-page-buttons-pagination.component";
import {PaginationWithSearchValue} from "../../../../../shared/interfaces/Pagination";
import {BaseComponent} from "../../../../../base.component";
import {ModalSignalService} from "../../../../../shared/services/modal-signal.service";
import {
  ChangeSizePaginationAndValueSearchComponent
} from "../../../../../components/change-size-pagination-and-value-search/change-size-pagination-and-value-search.component";
import {PaginationSignalService} from "../../../../../shared/services/pagination-signal.service";

@Component({
  selector: 'app-edit-delete-material',
  standalone: true,
  imports: [ NgClass, TitleCasePipe, RouterLink, AddEuroCurrencyPipe, ModalComponent, ChangePageButtonsPagination, ChangeSizePaginationAndValueSearchComponent ],
  templateUrl: './edit-delete-material.component.html',
  styles: [`
    @import "../../../scss/admin-general.scss";

    .material-name {
      max-width: 40vw;
      overflow-x: hidden;
    }
  `]
})
export class EditDeleteMaterialComponent extends BaseComponent implements OnInit {

  private dataSignal = inject(DataSignalService);
  private adminMaterialSignal = inject(AdminMaterialSignalService);
  private paginationSignal = inject(PaginationSignalService);
  modalSignal : ModalSignalService = inject(ModalSignalService);

  materials: Signal<MaterialDto[]> = this.dataSignal.$materials;

  isTableVisible: boolean = true;

  ngOnInit(): void {
    this.subscribeCounterMaterialValueChange();
    this.reloadPaginationValueAndCounter();
  }

  onValuePageChange(event : string): void {
    this.reloadPaginationValueAndCounter();
  }

  subscribeCounterMaterialValueChange(): void {
    this.subscriptions.push(
      this.adminMaterialSignal.$counter.subscribe((counter: number) => this.paginationSignal.setCounterItem(counter))
    )
  }

  private getNewMaterialsPaginated(): void {
    const PAGINATION_WITH_SEARCH_VALUE: PaginationWithSearchValue = this.paginationSignal.transformToPaginationWithSearchValue();
    this.adminMaterialSignal.getPaginatedWithSearchValue(PAGINATION_WITH_SEARCH_VALUE);
  }

  private getNewCounterMaterialsPaginated(): void {
    const PAGINATION_WITH_SEARCH_VALUE = this.paginationSignal.transformToPaginationWithSearchValue();
    this.adminMaterialSignal.getCounterWithSearchValue(PAGINATION_WITH_SEARCH_VALUE);
  }

  reloadPaginationValueAndCounter(): void {
    this.getNewMaterialsPaginated();
    this.getNewCounterMaterialsPaginated();
  }

  changeAvailability = (material : MaterialDto) => this.adminMaterialSignal.changeAvailabilityMaterial(material);
  changeAvailabilityForCustomization = (material : MaterialDto) => this.adminMaterialSignal.changeAvailabilityForCustomizationMaterial(material);
  delete = (materialSelected : MaterialDto) => this.adminMaterialSignal.confirmationModalForDeleteMaterial(materialSelected);
}
