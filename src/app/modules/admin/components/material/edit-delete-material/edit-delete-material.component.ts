import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialDto } from 'src/app/shared/interfaces/Material';
import { MaterialEditable } from '../../../interfaces/EditableObject';
import { FileUploadService } from '../../../services/file-upload.service';

@Component({
  selector: 'app-edit-delete-material',
  templateUrl: './edit-delete-material.component.html',
  styleUrls: ['./edit-delete-material.component.scss']
})
export class EditDeleteMaterialComponent {

  constructor(
    private fileUploadService: FileUploadService
  ){}

  @Input() materials! : MaterialDto[];
  @Input() materialTypes! : string[];
  @Output() materialToEdit: EventEmitter<MaterialDto> = new EventEmitter();
  @Output() materialSlugToDelete: EventEmitter<MaterialDto['slug']> = new EventEmitter();

  fileSizeMax: number = this.fileUploadService.SIZE_MAX;
  fileSize!: number;
  isTableVisible: boolean = false;
  isDropdownOpen : boolean = false;

  modalVisible : boolean = false;
  modalText! : string;

  public toolBarConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins : 'lists',
    menubar: false,
    toolbar: 'undo redo cut copy paste bold italic strikethrough numlist bullist styles alignleft aligncenter alignright alignjustify ',
  };

  openModalWithDescription(materialDescription : MaterialEditable['description']): void{
    this.modalVisible = true;
    this.modalText = materialDescription;
  }

  responseForModal(response : boolean): void{
    this.modalVisible = false;
  }

  edit(materialToEdit : MaterialDto): void{
    let materialEdited : MaterialDto = {
      ...materialToEdit
    }
    this.materialToEdit.emit(materialEdited);
  }

  delete = (materialSlug : MaterialDto['slug']) => this.materialSlugToDelete.emit(materialSlug);
}
