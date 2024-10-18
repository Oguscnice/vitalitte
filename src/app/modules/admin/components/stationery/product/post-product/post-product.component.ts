import { MaterialDto } from '../../../../../../shared/interfaces/Material';
import {Component, Signal, inject, OnInit} from '@angular/core';
import { CategoryDto } from '../../../../../../shared/interfaces/Category';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { FileUploadService } from '../../../../shared/services/file-upload.service';
import { CreateProduct } from '../../../../shared/interfaces/CreateProduct';
import { priceValidator } from '../../../../shared/validators/priceValidators';
import { urlValidator } from '../../../../shared/validators/urlValidators';
import { CollectionDto } from '../../../../../../shared/interfaces/Collection';
import { DecimalPipe, NgClass, TitleCasePipe } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CounterZeroIfEmpty } from '../../../../../../shared/services/pipes/counter-zero-if-empty.pipe';
import { TOOLS_BAR_CONFIG_EDITOR } from '../../../../shared/variables/Other';
import { DataSignalService } from '../../../../../../shared/services/data-signal.service';
import { SecondaryPictureDto } from '../../../../../../shared/interfaces/SecondaryPicture';
import { AdminProductSignalService } from '../../../../shared/services/admin-product-signal.service';
import { FormHelperService } from '../../../../shared/services/form-helper.service';
import { FileInfo } from '../../../../shared/interfaces/FileInfo';
import {ProductDto} from "../../../../../../shared/interfaces/Product";
import {ActivatedRoute} from "@angular/router";
import {EnumProductTypeFormatPipe} from "../../../../../../shared/services/pipes/enum-product-type-format.pipe";
import {CustomCurrencyPipe} from "../../../../../../shared/services/pipes/custom-currency.pipe";

@Component({
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, TitleCasePipe, DecimalPipe, EditorModule, CounterZeroIfEmpty, EnumProductTypeFormatPipe, CustomCurrencyPipe],
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styles: [`
    @import "../../../../scss/admin-general.scss";
    @import "src/app/scss/forms.scss";
    @import "src/app/scss/dropdowns.scss";
  `]
})
export class PostProductComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private dataSignalService = inject(DataSignalService);
  private adminProductSignal = inject(AdminProductSignalService);
  private route = inject(ActivatedRoute);
  fileUploadService = inject(FileUploadService);
  formHelper = inject(FormHelperService);

  toolBarConfig = TOOLS_BAR_CONFIG_EDITOR

  materialsDto$ = this.dataSignalService.$materials;
  categoriesDto$ = this.dataSignalService.$categories;
  collectionsDto$ = this.dataSignalService.$collections;
  productType!: ProductDto['productType'];
  currentMaterials: MaterialDto[] | null = [];
  currentSecondaryPictures: SecondaryPictureDto[] | null = [];

  isCategoryDropdownOpen: boolean = false;
  isCollectionDropdownOpen: boolean = false;
  isMaterialsDropdownOpen: boolean = false;

  isFormVisible: boolean = false;
  isFormSubmit: boolean = false;

  newProductForm = this.formBuilder.group({
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
    productType: ['', [Validators.required]],
  });

  newSecondaryPictureForm = this.formBuilder.group({
    picture: [''],
    pictureThumbnail: [''],
  });

  ngOnInit(): void {
    this.dataSignalService.getAllCategories();
    this.dataSignalService.getAllCollections();
    this.dataSignalService.getAllMaterials();
    this.dataSignalService.getAllMaterialsTypes();
    this.fileUploadService.patchImage(this.newProductForm, this.fileUploadService.imageProductDefault, this.fileUploadService.imageProductDefaultThumbnail);
    this.findProductTypeUrl();
  }

  private findProductTypeUrl(): void {
    this.route.params.subscribe((params) => {
      this.productType = params['productType'];
      this.newProductForm.get('productType')!.setValue(this.productType)
    });
  }

  toggleDropdown(dropdownClicked : 'Collection' | 'Category' | 'Materials'): void {
    const ACTUAL_VALUE: boolean = this[`is${dropdownClicked}DropdownOpen`];
    this.isCategoryDropdownOpen = false;
    this.isCollectionDropdownOpen = false;
    this.isMaterialsDropdownOpen = false;
    this[`is${dropdownClicked}DropdownOpen`] = !ACTUAL_VALUE;
  }

  addOrDeleteMaterial(materialClicked : MaterialDto): void {

    let currentMaterials: MaterialDto[] | null = this.formHelper.jsonParse<MaterialDto[]>(this.newProductForm.get('materialsDto')!.value);

    if (!currentMaterials) {
      currentMaterials = [];
    }

    if (!currentMaterials.some(item => item.slug === materialClicked.slug)) {
      currentMaterials.push(materialClicked)
    } else {
      currentMaterials = currentMaterials.filter(item => item.slug !== materialClicked.slug);
    }

    this.currentMaterials = currentMaterials.length < 1 ? null : currentMaterials;
    this.newProductForm.get('materialsDto')!.setValue(this.formHelper.jsonStringify<MaterialDto[]>(currentMaterials));
  }

  addOrDeleteSecondaryPicture(secondaryPicture: SecondaryPictureDto): void {

    let currentSecondaryPictures: SecondaryPictureDto[] | null = this.formHelper.jsonParse<SecondaryPictureDto[]>(this.newProductForm.get('secondaryPicturesDto')!.value) as SecondaryPictureDto[];

    if (!currentSecondaryPictures) {
      currentSecondaryPictures = [];
    }

    if (!currentSecondaryPictures.some(url => url.picture === secondaryPicture.picture)) {
      currentSecondaryPictures.push(secondaryPicture)
    } else {
      currentSecondaryPictures = currentSecondaryPictures.filter(item => item.picture !== secondaryPicture.picture);
    }

    this.currentSecondaryPictures = currentSecondaryPictures.length < 1 ? null : currentSecondaryPictures
    this.newProductForm.get('secondaryPicturesDto')!.setValue(this.formHelper.jsonStringify(currentSecondaryPictures));
  }

  onFileSelected(event: Event, form: 'newProductForm' | 'newSecondaryPictureForm'): void {
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
    this.formHelper.onValueSelected<CategoryDto | CollectionDto>(value, control, this.newProductForm);
  }

  totalPriceMaterials(): number {

    const CURRENT_MATERIALS: MaterialDto[] | null = this.formHelper.jsonParse(this.newProductForm.get('materialsDto')!.value!) as MaterialDto[];

    if (CURRENT_MATERIALS && CURRENT_MATERIALS.length > 0) {
      let sum: number = 0;
      for(const MATERIAL of CURRENT_MATERIALS){
        sum += MATERIAL.price
      }
      return sum;
    }
    return 0;
  }

  submitNewProductForm(): void {

    this.isFormSubmit = true

    if (this.newProductForm.valid) {
      const CREATED_PRODUCT : CreateProduct = this.formHelper.formatFormToProductDto<CreateProduct>(this.newProductForm);
      this.adminProductSignal.post(CREATED_PRODUCT);
      this.resetAllValues();
    }
  }

  resetAllValues(): void {
    this.isFormSubmit = false;
    this.isFormVisible = false;
    this.currentSecondaryPictures = [];
    this.newProductForm.reset();
    this.findProductTypeUrl();
    this.fileUploadService.patchImage(this.newProductForm, this.fileUploadService.imageProductDefault, this.fileUploadService.imageProductDefaultThumbnail);
  }
}
