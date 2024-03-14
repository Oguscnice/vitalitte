import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EMaterialType } from 'src/app/shared/interfaces/EMaterialType';
import { MaterialDto } from 'src/app/shared/interfaces/Material';

@Component({
  selector: 'app-edit-delete-material',
  templateUrl: './edit-delete-material.component.html',
  styleUrls: ['./edit-delete-material.component.scss']
})
export class EditDeleteMaterialComponent {

  @Input() materialsChild! : MaterialDto[];
  @Input() materialTypes! : (keyof typeof EMaterialType)[];
  @Output() materialToEdit: EventEmitter<MaterialDto> = new EventEmitter();
  @Output() materialSlugToDelete: EventEmitter<MaterialDto['slug']> = new EventEmitter();

  edit = (materialToEdit : MaterialDto) => this.materialToEdit.emit(materialToEdit);
  delete = (materialSlug : MaterialDto['slug']) => this.materialSlugToDelete.emit(materialSlug);
}
