import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialDto } from 'src/app/shared/interfaces/Material';
import { MaterialEditable } from '../../../interfaces/EditableObject';
import { FileUploadService } from '../../../services/file-upload.service';
import { FileInfo } from '../../../interfaces/FileInfo';

@Component({
  selector: 'app-edit-delete-material',
  templateUrl: './edit-delete-material.component.html',
  styleUrls: ['./edit-delete-material.component.scss']
})
export class EditDeleteMaterialComponent {

  constructor(
    private fileUploadService: FileUploadService
  ){}

  @Input() materialsEditableChild! : MaterialEditable[];
  @Input() materialTypes! : string[];
  @Output() materialToEdit: EventEmitter<MaterialEditable> = new EventEmitter();
  @Output() materialSlugToDelete: EventEmitter<MaterialDto['slug']> = new EventEmitter();

  fileSizeMax: number = this.fileUploadService.SIZE_MAX;
  fileSize!: number;
  isTableVisible: boolean = false;
  isDropdownOpen : boolean = false;

  changeValue(event: KeyboardEvent, materialSelected : MaterialEditable, data : string): void {
    const inputElement = event.target as HTMLInputElement;
    if (data === 'name') {
      materialSelected.name = inputElement.value;
    } else if (data === 'price') {
      materialSelected.price = parseFloat(inputElement.value);
    } else if (data === 'description') {
      materialSelected.description = inputElement.value;
    } else if (data === 'picture') {
      materialSelected.picture = inputElement.value;
    }
  }

  async onFileSelected(event: Event, materialSelected : MaterialEditable): Promise<void> {
    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files?.[0];
    let fileInfo: FileInfo | null = null;
    if (selectedFile) {
      this.fileSize = selectedFile.size;
      if (this.fileSize < this.fileSizeMax) {
        fileInfo = await this.fileUploadService.fileUpload(event);
        materialSelected.picture = fileInfo.data.thumb.url;
      }
    }
  }

  toogleDropdown(): void{
    this.isDropdownOpen = !this.isDropdownOpen
  }

  canEdit(materialSelected: MaterialEditable): void {
    materialSelected.canEdit = true;
  }
 
  cancelEditing(materialSelected: MaterialEditable): void {
    materialSelected.canEdit = false;
  }

  materialTypeClicked(materialSelected: MaterialEditable, valueClicked : string){
    materialSelected.materialType = valueClicked;
  }

  edit(materialToEdit : MaterialDto): void{
    let materialEdited : MaterialDto = {
      ...materialToEdit
    }
    this.materialToEdit.emit(materialEdited);
  }

  delete = (materialSlug : MaterialDto['slug']) => this.materialSlugToDelete.emit(materialSlug);
}
