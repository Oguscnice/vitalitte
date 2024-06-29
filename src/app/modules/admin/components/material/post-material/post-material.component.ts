import {Component, Input, Output, EventEmitter, inject, OnInit, Signal} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileUploadService } from '../../../shared/services/file-upload.service';
import { urlValidator } from '../../../shared/validators/urlValidators';
import { priceValidator } from '../../../shared/validators/priceValidators';
import { CreateMaterial } from '../../../shared/interfaces/Material';
import { NgClass, TitleCasePipe } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CounterZeroIfEmpty } from 'src/app/shared/services/pipes/counter-zero-if-empty.pipe';
import { TOOLS_BAR_CONFIG_EDITOR } from '../../../shared/variables/Other';
import {FormHelperService} from "../../../shared/services/form-helper.service";
import {DataSignalService} from "../../../../../shared/services/data-signal.service";
import {AdminMaterialSignalService} from "../../../shared/services/admin-material-signal.service";

@Component({
  standalone: true,
  imports: [ NgClass, ReactiveFormsModule, TitleCasePipe, EditorModule, CounterZeroIfEmpty ],
  selector: 'app-post-material',
  templateUrl: './post-material.component.html',
  styles: [` @import "../../../scss/admin-general.scss"; `]
})
export class PostMaterialComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private formHelper = inject(FormHelperService);
  private dataSignal = inject(DataSignalService);
  private adminMaterialSignal = inject(AdminMaterialSignalService);
  fileUploadService = inject(FileUploadService);

  materialTypes: Signal<string[]> = this.dataSignal.$materialTypes;

  isFormVisible: boolean = false;
  isCategoryDropdownOpen: boolean = false;
  isFormSubmit: boolean = false;

  toolBarConfig = TOOLS_BAR_CONFIG_EDITOR

  newMaterialForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    materialType : ['', [Validators.required]],
    price: ['', [Validators.required, priceValidator()]],
    description: ['', [Validators.required, Validators.maxLength(65534)]],
    picture: ['', [Validators.required, urlValidator()]],
    pictureThumbnail: ['', [Validators.required, urlValidator()]]
  });

  ngOnInit(): void {
      this.fileUploadService.patchImage(this.newMaterialForm, this.fileUploadService.imageMaterialDefault, this.fileUploadService.imageMaterialDefaultThumbnail);
      this.dataSignal.getAllMaterialsTypes();
  }

  toggleDropdown(dropdownClicked : 'Category'): void {
    this[`is${dropdownClicked}DropdownOpen`] = !this[`is${dropdownClicked}DropdownOpen`];
  }

  onFileSelected(event: Event, form: FormGroup): void {
    this.fileUploadService.onFileSelected(event, form).subscribe();
  }

  onMaterialTypeClicked(valueClicked : string): void {
    this.newMaterialForm.controls['materialType'].setValue(valueClicked);
  }

  submitNewMaterialForm(): void {
    this.isFormSubmit = true
    if (this.newMaterialForm.valid) {
      const CREATE_MATERIAL:  CreateMaterial = this.formHelper.formatFormToDto<CreateMaterial>(this.newMaterialForm);
      this.adminMaterialSignal.post(CREATE_MATERIAL);
      this.resetAllValues();
    }
  }

  resetAllValues(): void {
    this.isFormSubmit = false;
    this.isFormVisible = false;
    this.newMaterialForm.reset()
    this.fileUploadService.patchImage(this.newMaterialForm, this.fileUploadService.imageMaterialDefault, this.fileUploadService.imageMaterialDefault);
  }
}
