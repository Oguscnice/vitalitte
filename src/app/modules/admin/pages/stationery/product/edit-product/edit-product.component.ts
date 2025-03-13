import {Component, Signal, inject, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductDto } from '../../../../../../shared/interfaces/Product';
import { MaterialDto } from '../../../../../../shared/interfaces/Material';
import { priceValidator } from '../../../../shared/validators/priceValidators';
import { CategoryDto } from '../../../../../../shared/interfaces/Category';
import { CollectionDto } from '../../../../../../shared/interfaces/Collection';
import { TOOLS_BAR_CONFIG_EDITOR } from '../../../../shared/variables/Other';
import { FormHelperService } from '../../../../shared/services/form-helper.service';
import { DataSignalService } from '../../../../../../shared/services/data-signal.service';
import { AdminProductSignalService } from '../../../../shared/services/admin-product-signal.service';
import {BaseComponent} from "../../../../../../base.component";
import {FileService} from "../../../../../../shared/services/file.service";
import {FileDto} from "../../../../../../shared/interfaces/FileDto";

@Component({
  standalone: false,
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styles: [`
    @use "../../../../scss/admin-form.scss";
    @use "../../../../scss/admin-table.scss";
    @use "../../../../scss/admin-button.scss";
    @use "../../../../../../scss/forms.scss";
    @use "../../../../../../scss/dropdowns.scss";
    @use "../../../../../../scss/table.scss";
    @use "../../../../../../scss/variables.scss" as variablesScss;

    button {
      margin-top: variablesScss.$normal-margin;
    }
  `]
})
export class EditProductComponent extends BaseComponent implements OnInit {

  private adminProductSignal = inject(AdminProductSignalService);
  private dataSignal = inject(DataSignalService);
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  formHelper = inject(FormHelperService);
  fileService = inject(FileService);

  toolBarConfig = TOOLS_BAR_CONFIG_EDITOR;

  materials: Signal<MaterialDto[]> = this.dataSignal.$materials;
  categories: Signal<CategoryDto[]> = this.dataSignal.$categories;
  collections: Signal<CollectionDto[]> = this.dataSignal.$collections;
  currentMaterials: MaterialDto[] | null = [];

  isCategoryDropdownOpen : boolean = false;
  isCollectionDropdownOpen : boolean = false;
  isMaterialsDropdownOpen : boolean = false;

  editProductForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    slug: ['', [Validators.required]],
    pictureDto: ['', [Validators.required]],
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
    pictureDto: [null]
  });

  ngOnInit(): void {
    this.findProductSlugInUrl();
    this.dataSignal.getAllCategories();
    this.dataSignal.getAllCollections();
    this.dataSignal.getAllMaterials();
    this.subscribeToProductBySlugSignal();
  }

  private subscribeToProductBySlugSignal(): void {
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
    this.editProductForm.get('pictureDto')!.setValue(productDto.pictureDto.fileName);
    this.editProductForm.get('categoryDto')!.setValue(this.formHelper.jsonStringify<CategoryDto>(productDto.categoryDto));
    this.editProductForm.get('collectionDto')!.setValue(this.formHelper.jsonStringify<CollectionDto>(productDto.collectionDto));
    this.editProductForm.get('materialsDto')!.setValue(this.formHelper.jsonStringify<MaterialDto[]>(productDto.materialsDto));
    this.editProductForm.get('secondaryPicturesDto')!.setValue(this.formHelper.jsonStringify<FileDto[]>(productDto.secondaryPicturesDto));
    this.editProductForm.get('productType')!.setValue(productDto.productType)
    this.currentMaterials = productDto.materialsDto;
    this.fileService.picture = productDto.pictureDto;
    this.fileService.secondaryPictures = productDto.secondaryPicturesDto;
  }

  addOrDeleteSecondaryPicture(secondaryPicture: FileDto): void {
    this.fileService.addOrDeleteSecondaryPicture(secondaryPicture);
    this.editProductForm.get('secondaryPicturesDto')!.setValue(this.formHelper.jsonStringify(this.fileService.secondaryPictures));
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

  submitEditProductForm(): void {

    this.formHelper.isFormSubmit = true

    if (this.editProductForm.valid) {
      const EDITED_PRODUCT: ProductDto = this.formHelper.formatFormToProductDto<ProductDto>(this.editProductForm, this.fileService.picture!, this.fileService.secondaryPictures!);
      this.adminProductSignal.put(EDITED_PRODUCT);
      this.formHelper.resetAllValues(this.editProductForm);
    }
  }
}
