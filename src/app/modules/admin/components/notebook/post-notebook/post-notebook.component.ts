import { MaterialDto } from 'src/app/shared/interfaces/Material';
import {Component, Signal, inject, OnInit} from '@angular/core';
import { CategoryDto } from 'src/app/shared/interfaces/Category';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { FileUploadService } from '../../../shared/services/file-upload.service';
import { CreateNotebook } from '../../../shared/interfaces/Notebook';
import { priceValidator } from '../../../shared/validators/priceValidators';
import { urlValidator } from '../../../shared/validators/urlValidators';
import { CollectionDto } from 'src/app/shared/interfaces/Collection';
import { DecimalPipe, NgClass, TitleCasePipe } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CounterZeroIfEmpty } from 'src/app/shared/services/pipes/counter-zero-if-empty.pipe';
import { TOOLS_BAR_CONFIG_EDITOR } from '../../../shared/variables/Other';
import { DataSignalService } from 'src/app/shared/services/data-signal.service';
import { SecondaryPictureDto } from 'src/app/shared/interfaces/SecondaryPicture';
import { AdminNotebookSignalService } from '../../../shared/services/admin-notebook-signal.service';
import { FormHelperService } from '../../../shared/services/form-helper.service';
import { FileInfo } from '../../../shared/interfaces/FileInfo';

@Component({
  standalone: true,
  imports: [ NgClass, ReactiveFormsModule, TitleCasePipe, DecimalPipe, EditorModule, CounterZeroIfEmpty ],
  selector: 'app-post-notebook',
  templateUrl: './post-notebook.component.html',
  styles: [` @import "../../../scss/admin-general.scss"; `]
})
export class PostNotebookComponent implements OnInit {

  private formBuilder: FormBuilder = inject(FormBuilder);
  private dataSignalService: DataSignalService = inject(DataSignalService);
  private adminNotebookSignal: AdminNotebookSignalService = inject(AdminNotebookSignalService);
  fileUploadService: FileUploadService = inject(FileUploadService);
  formHelper: FormHelperService = inject(FormHelperService);

  toolBarConfig = TOOLS_BAR_CONFIG_EDITOR

  materials: Signal<MaterialDto[]> = this.dataSignalService.$materials;
  categories: Signal<CategoryDto[]> = this.dataSignalService.$categories;
  collections: Signal<CollectionDto[]> = this.dataSignalService.$collections;
  currentMaterials: MaterialDto[] | null = [];
  currentSecondaryPictures: SecondaryPictureDto[] | null = [];

  isCategoryDropdownOpen: boolean = false;
  isCollectionDropdownOpen: boolean = false;
  isMaterialsDropdownOpen: boolean = false;

  isFormVisible: boolean = false;
  isFormSubmit: boolean = false;

  ngOnInit(): void {
    this.dataSignalService.getAllCategories();
    this.dataSignalService.getAllCollections();
    this.dataSignalService.getAllMaterials();
    this.dataSignalService.getAllMaterialsTypes();
    this.fileUploadService.patchImage(this.newNotebookForm, this.fileUploadService.imageNotebookDefault, this.fileUploadService.imageNotebookDefaultThumbnail);
  }

  newNotebookForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    picture: ['', [Validators.required, urlValidator()]],
    pictureThumbnail: ['', [Validators.required, urlValidator()]],
    introduction: ['', [Validators.required, Validators.maxLength(65534)]],
    price: ['', [priceValidator()]],
    description: ['', [Validators.required, Validators.maxLength(65534)]],
    categoryDto: ['', [Validators.required]],
    collectionDto: ['', [Validators.required]],
    materialsDto: ['', [Validators.required]],
    secondaryPicturesDto: [''],
  });

  newSecondaryPictureForm = this.formBuilder.group({
    picture: [''],
    pictureThumbnail: [''],
  });

  toggleDropdown(dropdownClicked : 'Collection' | 'Category' | 'Materials'): void {
    const ACTUAL_VALUE: boolean = this[`is${dropdownClicked}DropdownOpen`];
    this.isCategoryDropdownOpen = false;
    this.isCollectionDropdownOpen = false;
    this.isMaterialsDropdownOpen = false;
    this[`is${dropdownClicked}DropdownOpen`] = !ACTUAL_VALUE;
  }

  addOrDeleteMaterial(materialClicked : MaterialDto): void {

    let currentMaterials: MaterialDto[] | null = this.formHelper.jsonParse<MaterialDto[]>(this.newNotebookForm.get('materialsDto')!.value);

    if (!currentMaterials) {
      currentMaterials = [];
    }

    if (!currentMaterials.some(item => item.slug === materialClicked.slug)) {
      currentMaterials.push(materialClicked)
    } else {
      currentMaterials = currentMaterials.filter(item => item.slug !== materialClicked.slug);
    }

    this.currentMaterials = currentMaterials.length < 1 ? null : currentMaterials;
    this.newNotebookForm.get('materialsDto')!.setValue(this.formHelper.jsonStringify<MaterialDto[]>(currentMaterials));
  }

  addOrDeleteSecondaryPicture(secondaryPicture: SecondaryPictureDto): void {

    let currentSecondaryPictures: SecondaryPictureDto[] | null = this.formHelper.jsonParse<SecondaryPictureDto[]>(this.newNotebookForm.get('secondaryPicturesDto')!.value) as SecondaryPictureDto[];

    if (!currentSecondaryPictures) {
      currentSecondaryPictures = [];
    }

    if (!currentSecondaryPictures.some(url => url.picture === secondaryPicture.picture)) {
      currentSecondaryPictures.push(secondaryPicture)
    } else {
      currentSecondaryPictures = currentSecondaryPictures.filter(item => item.picture !== secondaryPicture.picture);
    }

    this.currentSecondaryPictures = currentSecondaryPictures.length < 1 ? null : currentSecondaryPictures
    this.newNotebookForm.get('secondaryPicturesDto')!.setValue(this.formHelper.jsonStringify(currentSecondaryPictures));
  }

  onFileSelected(event: Event, form: 'newNotebookForm' | 'newSecondaryPictureForm'): void {
  const FORM_GROUP: FormGroup = this[form];
  this.fileUploadService.onFileSelected(event, FORM_GROUP).subscribe({
    next: (fileInfo: FileInfo | null) => {
      if (form === 'newSecondaryPictureForm' && fileInfo) {
        this.addOrDeleteSecondaryPicture(FORM_GROUP.value as SecondaryPictureDto);
        FORM_GROUP.reset();
      }
    },
    error: (err) => (console.log(err.error.message))
    });
  }

  onValueSelected(control: string, value: CategoryDto | CollectionDto): void {
    this.formHelper.onValueSelected<CategoryDto | CollectionDto>(value, control, this.newNotebookForm);
  }

  totalPriceMaterials(): number {

    const CURRENT_MATERIALS: MaterialDto[] | null = this.formHelper.jsonParse(this.newNotebookForm.get('materialsDto')!.value!) as MaterialDto[];

    if (CURRENT_MATERIALS && CURRENT_MATERIALS.length > 0) {
      let sum: number = 0;
      for(const MATERIAL of CURRENT_MATERIALS){
        sum += MATERIAL.price
      }
      return sum;
    }
    return 0;
  }

  submitNewNotebookForm(): void {

    this.isFormSubmit = true

    if (this.newNotebookForm.valid) {
      const CREATED_NOTEBOOK : CreateNotebook = this.formHelper.formatFormToNotebookDto<CreateNotebook>(this.newNotebookForm) as CreateNotebook;
      this.adminNotebookSignal.postNotebook(CREATED_NOTEBOOK);
      this.resetAllValues();
    }
  }

  resetAllValues(): void {
    this.isFormSubmit = false;
    this.isFormVisible = false;
    this.currentSecondaryPictures = [];
    this.newNotebookForm.reset();
    this.fileUploadService.patchImage(this.newNotebookForm, this.fileUploadService.imageNotebookDefault, this.fileUploadService.imageNotebookDefaultThumbnail);
  }
}
