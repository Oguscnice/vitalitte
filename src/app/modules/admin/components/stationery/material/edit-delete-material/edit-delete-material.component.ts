import {Component, inject, OnInit} from '@angular/core';
import { MaterialDto } from '../../../../../../shared/interfaces/Material';
import { NgClass, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AddEuroCurrencyPipe } from '../../../../../../shared/services/pipes/add-euro-currency.pipe';
import { ModalComponent } from '../../../../../../components/modal/modal.component';
import {DataSignalService} from "../../../../../../shared/services/data-signal.service";
import {AdminMaterialSignalService} from "../../../../shared/services/admin-material-signal.service";
import {
  ChangePageButtonsPagination
} from "../../../../../../components/change-page-buttons-pagination/change-page-buttons-pagination.component";
import {BaseComponent} from "../../../../../../base.component";
import {ModalSignalService} from "../../../../../../shared/services/modal-signal.service";
import {
  ChangeSizePaginationAndValueSearchComponent
} from "../../../../../../components/change-size-pagination-and-value-search/change-size-pagination-and-value-search.component";
import {PaginationSignalService} from "../../../../../../shared/services/pagination-signal.service";

@Component({
  selector: 'app-edit-delete-material',
  standalone: true,
  imports: [ NgClass, TitleCasePipe, RouterLink, AddEuroCurrencyPipe, ModalComponent, ChangePageButtonsPagination, ChangeSizePaginationAndValueSearchComponent ],
  templateUrl: './edit-delete-material.component.html',
  styles: [`
    @import "../../../../scss/admin-general";

    .material-name {
      max-width: 40vw;
      overflow-x: hidden;
    }
  `]
})
export class EditDeleteMaterialComponent extends BaseComponent implements OnInit {

  private dataSignal = inject(DataSignalService);
  private adminMaterialSignal = inject(AdminMaterialSignalService);
  modalSignal : ModalSignalService = inject(ModalSignalService);

  materials$ = this.dataSignal.$materials;

  isTableVisible: boolean = true;

  ngOnInit(): void {
    this.adminMaterialSignal.getPaginatedWithSearchValue();
  }

  onValuePageChange(event : string): void {
    this.adminMaterialSignal.getPaginatedWithSearchValue();
  }

  changeAvailability = (material : MaterialDto) => this.adminMaterialSignal.changeAvailabilityMaterial(material);
  changeAvailabilityForCustomization = (material : MaterialDto) => this.adminMaterialSignal.changeAvailabilityForCustomizationMaterial(material);
  delete = (materialSelected : MaterialDto) => this.adminMaterialSignal.confirmationModalForDeleteMaterial(materialSelected);
}
