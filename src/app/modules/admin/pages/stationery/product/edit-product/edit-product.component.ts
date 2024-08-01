import {Component, Signal, inject, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileUploadService } from '../../../../shared/services/file-upload.service';
import { ProductDto } from '../../../../../../shared/interfaces/Product';
import { MaterialDto } from '../../../../../../shared/interfaces/Material';
import { urlValidator } from '../../../../shared/validators/urlValidators';
import { priceValidator } from '../../../../shared/validators/priceValidators';
import { CategoryDto } from '../../../../../../shared/interfaces/Category';
import { CollectionDto } from '../../../../../../shared/interfaces/Collection';
import { TOOLS_BAR_CONFIG_EDITOR } from '../../../../shared/variables/Other';
import { FormHelperService } from '../../../../shared/services/form-helper.service';
import { DataSignalService } from '../../../../../../shared/services/data-signal.service';
import { SecondaryPictureDto } from '../../../../../../shared/interfaces/SecondaryPicture';
import { AdminProductSignalService } from '../../../../shared/services/admin-product-signal.service';
import { FileInfo } from '../../../../shared/interfaces/FileInfo';
import {BaseComponent} from "../../../../../../base.component";

@Component({
  standalone: false,
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styles: [` @import "../../../../scss/admin-general"; `]
})
export class EditProductComponent extends BaseComponent implements OnInit {

  private adminProductSignal = inject(AdminProductSignalService);
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

  editProductForm = this.formBuilder.group({
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
    productType: ['', [Validators.required]],
  });

  newSecondaryPictureForm = this.formBuilder.group({
    picture: [''],
    pictureThumbnail: [''],
  });

  ngOnInit(): void {
    this.findProductSlugInUrl();
    this.dataSignal.getAllCategories();
    this.dataSignal.getAllCollections();
    this.dataSignal.getAllMaterials();
    this.subscribeToProductBySlugSignal();
  }

  subscribeToProductBySlugSignal(): void {
    this.subscriptions.push(
      this.dataSignal.$productDtoBySlug.subscribe(
      (productDto) => {
        if (productDto) {
          this.patchFormValue(productDto);
        }
      })
    )
  }

  findProductSlugInUrl(): void {
    this.route.params.subscribe((params) => this.dataSignal.getProductBySlug(params['productSlug']));
  }

  patchFormValue(productDto : ProductDto): void {
    this.editProductForm.get('name')!.setValue(productDto.name);
    this.editProductForm.get('slug')!.setValue(productDto.slug!);
    this.editProductForm.get('price')!.setValue(productDto.price.toString());
    this.editProductForm.get('introduction')!.setValue(productDto.introduction);
    this.editProductForm.get('description')!.setValue(productDto.description);
    this.editProductForm.get('picture')!.setValue(productDto.picture);
    this.editProductForm.get('pictureThumbnail')!.setValue(productDto.pictureThumbnail);
    this.editProductForm.get('categoryDto')!.setValue(this.formHelper.jsonStringify<CategoryDto>(productDto.categoryDto));
    this.editProductForm.get('collectionDto')!.setValue(this.formHelper.jsonStringify<CollectionDto>(productDto.collectionDto));
    this.editProductForm.get('materialsDto')!.setValue(this.formHelper.jsonStringify<MaterialDto[]>(productDto.materialsDto));
    this.editProductForm.get('secondaryPicturesDto')!.setValue(this.formHelper.jsonStringify<SecondaryPictureDto[]>(productDto.secondaryPicturesDto));
    this.editProductForm.get('productType')!.setValue(productDto.productType)
    this.currentMaterials = productDto.materialsDto;
    this.currentSecondaryPictures = productDto.secondaryPicturesDto;
  }

  addOrDeleteSecondaryPicture(secondaryPicture: SecondaryPictureDto): void {

    let currentSecondaryPictures: SecondaryPictureDto[] | '' = this.formHelper.jsonParse<SecondaryPictureDto[]>(this.editProductForm.get('secondaryPicturesDto')!.value) as SecondaryPictureDto[];

    if (!currentSecondaryPictures) {
      currentSecondaryPictures = [];
    }

    if (!currentSecondaryPictures.some(url => url.picture === secondaryPicture.picture)) {
      currentSecondaryPictures.push(secondaryPicture)
    } else {
      currentSecondaryPictures = currentSecondaryPictures.filter(item => item.picture !== secondaryPicture.picture);
    }

    this.currentSecondaryPictures = currentSecondaryPictures.length < 1 ? null : currentSecondaryPictures
    this.editProductForm.get('secondaryPicturesDto')!.setValue(this.formHelper.jsonStringify(currentSecondaryPictures));
  }

  addOrDeleteMateriel(materialClicked : MaterialDto): void {

    let currentMaterials: MaterialDto[] | null = this.formHelper.jsonParse<MaterialDto[]>(this.editProductForm.get('materialsDto')!.value);

    if (!currentMaterials) {
      currentMaterials = [];
    }

    if (!currentMaterials.some(item => item.slug === materialClicked.slug)) {
      currentMaterials.push(materialClicked)
    } else {
      currentMaterials = currentMaterials.filter(item => item.slug !== materialClicked.slug);
    }

    this.currentMaterials = currentMaterials.length < 1 ? null : currentMaterials;
    this.editProductForm.get('materialsDto')!.setValue(this.formHelper.jsonStringify<MaterialDto[]>(currentMaterials));
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
    this.formHelper.onValueSelected<CategoryDto | CollectionDto>(value, control, this.editProductForm);
  }

  onFileSelected(event: Event, form: 'editProductForm' | 'newSecondaryPictureForm'): void {

    const FORM_GROUP = this[form];

    this.fileUploadService.onFileSelected(event, FORM_GROUP).subscribe((fileInfo: FileInfo | null) => {
          if (form === 'newSecondaryPictureForm' && fileInfo) {
            this.addOrDeleteSecondaryPicture(FORM_GROUP.value as SecondaryPictureDto);
            FORM_GROUP.reset();
          }
        });
    }

  submitEditProductForm(): void {

    this.isFormSubmit = true

    if (this.editProductForm.valid) {
      const EDITED_PRODUCT: ProductDto = this.formHelper.formatFormToProductDto<ProductDto>(this.editProductForm);
      this.adminProductSignal.put(EDITED_PRODUCT);
      this.isFormSubmit = false;
    }
  }
}
