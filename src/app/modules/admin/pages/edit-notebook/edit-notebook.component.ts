import {Component, Signal, inject, OnInit, OnDestroy} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileUploadService } from '../../shared/services/file-upload.service';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';
import { MaterialDto } from 'src/app/shared/interfaces/Material';
import { urlValidator } from '../../shared/validators/urlValidators';
import { priceValidator } from '../../shared/validators/priceValidators';
import { CategoryDto } from 'src/app/shared/interfaces/Category';
import { CollectionDto } from 'src/app/shared/interfaces/Collection';
import { TOOLS_BAR_CONFIG_EDITOR } from '../../shared/variables/Other';
import { FormHelperService } from '../../shared/services/form-helper.service';
import { DataSignalService } from 'src/app/shared/services/data-signal.service';
import { SecondaryPictureDto } from 'src/app/shared/interfaces/SecondaryPicture';
import { AdminNotebookSignalService } from '../../shared/services/admin-notebook-signal.service';
import { FileInfo } from '../../shared/interfaces/FileInfo';
import {BaseComponent} from "../../../../base.component";

@Component({
  standalone: false,
  selector: 'app-edit-notebook',
  templateUrl: './edit-notebook.component.html',
  styles: [` @import "../../scss/admin-general.scss"; `]
})
export class EditNotebookComponent extends BaseComponent implements OnInit {

  private adminNotebookSignal = inject(AdminNotebookSignalService);
  private dataSignal = inject(DataSignalService);
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  formHelper = inject(FormHelperService);
  fileUploadService = inject(FileUploadService);

  toolBarConfig = TOOLS_BAR_CONFIG_EDITOR;

  materials: Signal<MaterialDto[]> = this.dataSignal.$materials;
  categories: Signal<CategoryDto[]> = this.dataSignal.$categories;
  collections: Signal<CollectionDto[]> = this.dataSignal.$collections;
  currentMaterials: MaterialDto[] | null = [];
  currentSecondaryPictures: SecondaryPictureDto[] | null = [];

  isCategoryDropdownOpen : boolean = false;
  isCollectionDropdownOpen : boolean = false;
  isMaterialsDropdownOpen : boolean = false;

  isFormSubmit : boolean = false;

  editNotebookForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    slug: ['', [Validators.required]],
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

  ngOnInit(): void {
    this.findNotebookSlugInUrl();
    this.dataSignal.getAllCategories();
    this.dataSignal.getAllCollections();
    this.dataSignal.getAllMaterials();
    this.subscribeToNotebookBySlugSignal();
  }

  subscribeToNotebookBySlugSignal(): void {
    this.subscriptions.push(
      this.dataSignal.$notebookBySlug.subscribe(
      (notebook) => {
        if (notebook) {
          this.patchFormValue(notebook);
        }
      })
    )
  }

  findNotebookSlugInUrl(): void {
    this.route.params.subscribe((params) => this.dataSignal.getNotebookBySlug(params['notebookSlug']));
  }

  patchFormValue(notebook : NotebookDto): void {
    this.editNotebookForm.get('name')!.setValue(notebook.name);
    this.editNotebookForm.get('slug')!.setValue(notebook.slug);
    this.editNotebookForm.get('price')!.setValue(notebook.price.toString());
    this.editNotebookForm.get('introduction')!.setValue(notebook.introduction);
    this.editNotebookForm.get('description')!.setValue(notebook.description);
    this.editNotebookForm.get('picture')!.setValue(notebook.picture);
    this.editNotebookForm.get('pictureThumbnail')!.setValue(notebook.pictureThumbnail);
    this.editNotebookForm.get('categoryDto')!.setValue(this.formHelper.jsonStringify<CategoryDto>(notebook.categoryDto));
    this.editNotebookForm.get('collectionDto')!.setValue(this.formHelper.jsonStringify<CollectionDto>(notebook.collectionDto));
    this.editNotebookForm.get('materialsDto')!.setValue(this.formHelper.jsonStringify<MaterialDto[]>(notebook.materialsDto));
    this.editNotebookForm.get('secondaryPicturesDto')!.setValue(this.formHelper.jsonStringify<SecondaryPictureDto[]>(notebook.secondaryPicturesDto));
    this.currentMaterials = notebook.materialsDto;
    this.currentSecondaryPictures = notebook.secondaryPicturesDto;
  }

  addOrDeleteSecondaryPicture(secondaryPicture: SecondaryPictureDto): void {

    let currentSecondaryPictures: SecondaryPictureDto[] | '' = this.formHelper.jsonParse<SecondaryPictureDto[]>(this.editNotebookForm.get('secondaryPicturesDto')!.value) as SecondaryPictureDto[];

    if (!currentSecondaryPictures) {
      currentSecondaryPictures = [];
    }

    if (!currentSecondaryPictures.some(url => url.picture === secondaryPicture.picture)) {
      currentSecondaryPictures.push(secondaryPicture)
    } else {
      currentSecondaryPictures = currentSecondaryPictures.filter(item => item.picture !== secondaryPicture.picture);
    }

    this.currentSecondaryPictures = currentSecondaryPictures.length < 1 ? null : currentSecondaryPictures
    this.editNotebookForm.get('secondaryPicturesDto')!.setValue(this.formHelper.jsonStringify(currentSecondaryPictures));
  }

  addOrDeleteMateriel(materialClicked : MaterialDto): void {

    let currentMaterials: MaterialDto[] | null = this.formHelper.jsonParse<MaterialDto[]>(this.editNotebookForm.get('materialsDto')!.value);

    if (!currentMaterials) {
      currentMaterials = [];
    }

    if (!currentMaterials.some(item => item.slug === materialClicked.slug)) {
      currentMaterials.push(materialClicked)
    } else {
      currentMaterials = currentMaterials.filter(item => item.slug !== materialClicked.slug);
    }

    this.currentMaterials = currentMaterials.length < 1 ? null : currentMaterials;
    this.editNotebookForm.get('materialsDto')!.setValue(this.formHelper.jsonStringify<MaterialDto[]>(currentMaterials));
  }

  toggleDropdown(dropdownClicked : 'Collection' | 'Category' | 'Materials'): void {
    const actualValue = this[`is${dropdownClicked}DropdownOpen`];
    this.isCategoryDropdownOpen = false;
    this.isCollectionDropdownOpen = false;
    this.isMaterialsDropdownOpen = false;
    this[`is${dropdownClicked}DropdownOpen`] = !actualValue;
  }

  totalPriceMaterials(): number {

    if (this.currentMaterials && this.currentMaterials.length > 0) {
      let sum = 0;
      for(const MATERIAL of this.currentMaterials){
        sum += MATERIAL.price
      }
      return sum;
    }
    return 0;
  }

  onValueSelected(control: string, value: CategoryDto | CollectionDto): void {
    this.formHelper.onValueSelected<CategoryDto | CollectionDto>(value, control, this.editNotebookForm);
  }

  onFileSelected(event: Event, form: 'editNotebookForm' | 'newSecondaryPictureForm'): void {

    const FORM_GROUP = this[form];

    this.fileUploadService.onFileSelected(event, FORM_GROUP).subscribe((fileInfo: FileInfo | null) => {
          if (form === 'newSecondaryPictureForm' && fileInfo) {
            this.addOrDeleteSecondaryPicture(FORM_GROUP.value as SecondaryPictureDto);
            FORM_GROUP.reset();
          }
        });
    }

  submitEditNotebookForm(): void {

    this.isFormSubmit = true

    if (this.editNotebookForm.valid) {
      const EDITED_NOTEBOOK: NotebookDto = this.formHelper.formatFormToNotebookDto(this.editNotebookForm) as NotebookDto;
      this.adminNotebookSignal.putNotebook(EDITED_NOTEBOOK);
      this.isFormSubmit = false;
    }
  }
}
