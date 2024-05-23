import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialDto } from 'src/app/shared/interfaces/Material';
import { MaterialEditable } from '../../../interfaces/EditableObject';
import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AddEuroCurrencyPipe } from 'src/app/shared/services/pipes/add-euro-currency.pipe';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-edit-delete-material',
  standalone: true,
  imports: [ NgClass, TitleCasePipe, RouterLink, AddEuroCurrencyPipe, ModalComponent ],
  templateUrl: './edit-delete-material.component.html',
  styles: [ `@import "../../../scss/admin-general.scss"; `]
})
export class EditDeleteMaterialComponent {

  @Input() materials! : MaterialDto[];
  @Input() materialTypes! : string[];
  @Output() materialToEdit: EventEmitter<MaterialDto> = new EventEmitter();
  @Output() changeAvailabilityMaterial: EventEmitter<MaterialDto> = new EventEmitter();
  @Output() materialToDelete: EventEmitter<MaterialDto> = new EventEmitter();

  isTableVisible: boolean = true;

  modalVisible : boolean = false;
  modalText! : string;

  openModalWithDescription(materialDescription : MaterialEditable['description']): void{
    this.modalVisible = true;
    this.modalText = materialDescription;
  }

  responseForModal(response: boolean): void {
    this.modalVisible = false;
  }

  changeAvailability = (material : MaterialDto) => this.changeAvailabilityMaterial.emit(material);
  edit = (materialEdited : MaterialDto) =>  this.materialToEdit.emit(materialEdited);
  delete = (materialSelected : MaterialDto) => this.materialToDelete.emit(materialSelected);
}
