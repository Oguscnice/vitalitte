import {Component, inject, OnInit} from '@angular/core';
import { MaterialDto } from '../../../../../../shared/interfaces/Material';
import { NgClass, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AddEuroCurrencyPipe } from '../../../../../../shared/services/pipes/add-euro-currency.pipe';
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
import {FileService} from "../../../../../../shared/services/file.service";

@Component({
  selector: 'app-edit-delete-material',

  imports: [ NgClass, TitleCasePipe, RouterLink, AddEuroCurrencyPipe, ChangePageButtonsPagination, ChangeSizePaginationAndValueSearchComponent ],
  templateUrl: './edit-delete-material.component.html',
  styles: [`
    @use "../../../../scss/admin-general.scss";
    @use "../../../../scss/admin-table.scss";
    @use "../../../../scss/admin-toggle.scss";

    .material-name {
      max-width: 40vw;
      overflow-x: hidden;
    }
  `]
})
export class EditDeleteMaterialComponent extends BaseComponent implements OnInit {

  private dataSignal = inject(DataSignalService);
  private adminMaterialSignal = inject(AdminMaterialSignalService);
  private modalSignal = inject(ModalSignalService);
  fileService = inject(FileService);

  materials$ = this.dataSignal.$materials;

  isTableVisible: boolean = true;

  ngOnInit(): void {
    this.adminMaterialSignal.getPaginatedWithSearchValue();
  }

  onValuePageChange(event : string): void {
    this.adminMaterialSignal.getPaginatedWithSearchValue();
  }

  openModalWithDescription(materialDescription : MaterialDto['description']): void {
    this.modalSignal.showModal(materialDescription, false);
  }

  changeAvailability = (material : MaterialDto) => this.adminMaterialSignal.changeAvailabilityMaterial(material);
  changeAvailabilityForCustomization = (material : MaterialDto) => this.adminMaterialSignal.changeAvailabilityForCustomizationMaterial(material);
  delete = (materialSelected : MaterialDto) => this.adminMaterialSignal.confirmationModalForDeleteMaterial(materialSelected);
}
