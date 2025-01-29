import { MaterialDto } from '../../../../../../shared/interfaces/Material';
import {Component, inject, OnInit} from '@angular/core';
import { CategoryDto } from '../../../../../../shared/interfaces/Category';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { CreateProduct } from '../../../../shared/interfaces/CreateProduct';
import { priceValidator } from '../../../../shared/validators/priceValidators';
import { CollectionDto } from '../../../../../../shared/interfaces/Collection';
import { NgClass, TitleCasePipe } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CounterZeroIfEmpty } from '../../../../../../shared/services/pipes/counter-zero-if-empty.pipe';
import { TOOLS_BAR_CONFIG_EDITOR } from '../../../../shared/variables/Other';
import { DataSignalService } from '../../../../../../shared/services/data-signal.service';
import { AdminProductSignalService } from '../../../../shared/services/admin-product-signal.service';
import { FormHelperService } from '../../../../shared/services/form-helper.service';
import {ProductDto} from "../../../../../../shared/interfaces/Product";
import {ActivatedRoute} from "@angular/router";
import {EnumProductTypeFormatPipe} from "../../../../../../shared/services/pipes/enum-product-type-format.pipe";
import {CustomCurrencyPipe} from "../../../../../../shared/services/pipes/custom-currency.pipe";
import {FileService} from "../../../../../../shared/services/file.service";
import {FileDto} from "../../../../../../shared/interfaces/FileDto";
import {BaseComponent} from "../../../../../../base.component";
import {AnguilleSignalService} from "../../../../../../shared/services/anguille-signal.service";

@Component({
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, TitleCasePipe, EditorModule, CounterZeroIfEmpty, EnumProductTypeFormatPipe, CustomCurrencyPipe],
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styles: [`
    @import "../../../../scss/admin-general.scss";
    @import "../../../../../../scss/forms.scss";
    @import "../../../../../../scss/dropdowns.scss";
  `]
})
export class PostProductComponent extends BaseComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private dataSignalService = inject(DataSignalService);
  private adminProductSignal = inject(AdminProductSignalService);
  private route = inject(ActivatedRoute);
  private anguilleSignal = inject(AnguilleSignalService);
  fileService = inject(FileService);
  formHelper = inject(FormHelperService);

  toolBarConfig = TOOLS_BAR_CONFIG_EDITOR

  materialsDto$ = this.dataSignalService.$materials;
  categoriesDto$ = this.dataSignalService.$categories;
  collectionsDto$ = this.dataSignalService.$collections;
  productType!: ProductDto['productType'];
  currentMaterials: MaterialDto[] | null = [];

  isCategoryDropdownOpen: boolean = false;
  isCollectionDropdownOpen: boolean = false;
  isMaterialsDropdownOpen: boolean = false;

  newProductForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
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
    pictureDto: [null],
  });

  ngOnInit(): void {
    this.dataSignalService.getAllCategories();
    this.dataSignalService.getAllCollections();
    this.dataSignalService.getAllMaterials();
    this.dataSignalService.getAllMaterialsTypes();
    this.patchImageDefault();
    this.findProductTypeUrl();
  }

  private patchImageDefault(): void {
    this.subscriptions.push(
      this.fileService.patchImage(this.fileService.imageProductDefault).subscribe({
        next: (fileDto) => this.newProductForm.get('pictureDto')!.setValue(fileDto.fileName),
        error: (err) => this.anguilleSignal.changeMessage("Erreur lors de la récupération de l'image par défaut"),
      })
    )
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

  addOrDeleteSecondaryPicture(secondaryPicture: FileDto): void {
    this.fileService.addOrDeleteSecondaryPicture(secondaryPicture)
    this.newProductForm.get('secondaryPicturesDto')!.setValue(this.formHelper.jsonStringify(this.fileService.secondaryPictures));
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

    this.formHelper.isFormSubmit = true

    if (this.newProductForm.valid) {
      const CREATED_PRODUCT: CreateProduct = this.formHelper.formatFormToProductDto<CreateProduct>(this.newProductForm, this.fileService.picture!, this.fileService.secondaryPictures!);
      this.adminProductSignal.post(CREATED_PRODUCT);
      this.formHelper.resetAllValues(this.newProductForm);
      this.findProductTypeUrl();
    }
  }
}
