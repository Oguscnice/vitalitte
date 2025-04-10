import {Component, inject, OnInit, Signal} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { MaterialDto } from '../../../../../../shared/interfaces/Material';
import { FormBuilder, Validators} from '@angular/forms';
import { priceValidator } from '../../../../shared/validators/priceValidators';
import { TOOLS_BAR_CONFIG_EDITOR } from '../../../../shared/variables/Other';
import {FormHelperService} from "../../../../shared/services/form-helper.service";
import {DataSignalService} from "../../../../../../shared/services/data-signal.service";
import {AdminMaterialSignalService} from "../../../../shared/services/admin-material-signal.service";
import {BaseComponent} from "../../../../../../base.component";
import {FileService} from "../../../../../../shared/services/file.service";

@Component({
  standalone: false,
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styles: [`
    @use "../../../../scss/admin-general.scss";
    @use "../../../../scss/admin-button.scss";
    @use "../../../../../../scss/forms.scss";
    @use "../../../../../../scss/dropdowns.scss";
  `]
})
export class EditMaterialComponent extends BaseComponent implements OnInit {

  private route  = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private dataSignal = inject(DataSignalService);
  private adminMaterialSignal = inject(AdminMaterialSignalService);
  fileService = inject(FileService);
  formHelper = inject(FormHelperService);

  materialTypes: Signal<string[]> = this.dataSignal.$materialTypes;

  isCategoryDropdownOpen : boolean = false;

  toolBarConfig = TOOLS_BAR_CONFIG_EDITOR

  editMaterialForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    slug: ['', [Validators.required]],
    materialType : ['', [Validators.required]],
    price: ['', [priceValidator()]],
    description: ['', [Validators.required, Validators.maxLength(65534)]],
    pictureDto: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.findMaterialSlugInUrl();
    this.dataSignal.getAllMaterialsTypes();
    this.subscribeToMaterialSlugChanges();
  }

  subscribeToMaterialSlugChanges(): void {
    this.subscriptions.push(
      this.adminMaterialSignal.$materialBySlug.subscribe(
        (material): void => {
          if (material) {
            this.patchFormValue(material);
          }
        })
    )
  }

  findMaterialSlugInUrl(): void {
    this.route.params.subscribe((params: Params) => this.adminMaterialSignal.getMaterialBySlug(params['materielSlug']));
  }

  patchFormValue(material: MaterialDto): void {
    this.editMaterialForm.get('name')!.setValue(material.name);
    this.editMaterialForm.get('slug')!.setValue(material.slug);
    this.editMaterialForm.get('price')!.setValue(material.price.toString());
    this.editMaterialForm.get('materialType')!.setValue(material.materialType);
    this.editMaterialForm.get('description')!.setValue(material.description);
    this.editMaterialForm.get('pictureDto')!.setValue(material.pictureDto.fileName);
    this.fileService.picture = material.pictureDto;
  }

  toggleDropdown(dropdownClicked : 'Category'): void {
    this[`is${dropdownClicked}DropdownOpen`] = !this[`is${dropdownClicked}DropdownOpen`];
  }

  onMaterialTypeClicked(valueClicked : string): void {
    this.editMaterialForm.controls['materialType'].setValue(valueClicked);
  }

  submitEditMaterialForm(): void {
    this.formHelper.isFormSubmit = true
    if (this.editMaterialForm.valid) {
      const EDITED_MATERIAL: MaterialDto = this.formHelper.formatFormWithMainPicture<MaterialDto>(this.editMaterialForm, this.fileService.picture!)
      this.adminMaterialSignal.put(EDITED_MATERIAL);
      this.formHelper.resetAllValues(this.editMaterialForm);
    }
  }
}
