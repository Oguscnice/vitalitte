import {Component, inject, OnInit, Signal} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { priceValidator } from '../../../../shared/validators/priceValidators';
import { CreateMaterial } from '../../../../shared/interfaces/CreateMaterial';
import { NgClass, TitleCasePipe } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CounterZeroIfEmpty } from '../../../../../../shared/services/pipes/counter-zero-if-empty.pipe';
import { TOOLS_BAR_CONFIG_EDITOR } from '../../../../shared/variables/Other';
import {FormHelperService} from "../../../../shared/services/form-helper.service";
import {DataSignalService} from "../../../../../../shared/services/data-signal.service";
import {AdminMaterialSignalService} from "../../../../shared/services/admin-material-signal.service";
import {FileService} from "../../../../../../shared/services/file.service";
import {AnguilleSignalService} from "../../../../../../shared/services/anguille-signal.service";
import {BaseComponent} from "../../../../../../base.component";

@Component({
  imports: [ NgClass, ReactiveFormsModule, TitleCasePipe, EditorModule, CounterZeroIfEmpty ],
  selector: 'app-post-material',
  templateUrl: './post-material.component.html',
  styles: [`
    @use "../../../../scss/admin-general.scss";
    @use "../../../../scss/admin-button.scss";
    @use "../../../../../../scss/forms.scss";
    @use "../../../../../../scss/dropdowns.scss";
  `]
})
export class PostMaterialComponent extends BaseComponent implements OnInit {

  private dataSignal = inject(DataSignalService);
  private formBuilder = inject(FormBuilder);
  private adminMaterialSignal = inject(AdminMaterialSignalService);
  private anguilleSignal = inject(AnguilleSignalService);
  fileService = inject(FileService);
  formHelper = inject(FormHelperService);
  isCategoryDropdownOpen: boolean = false;
  toolBarConfig = TOOLS_BAR_CONFIG_EDITOR

  materialTypes = this.dataSignal.$materialTypes;

  newMaterialForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    materialType : ['', [Validators.required]],
    price: ['', [Validators.required, priceValidator()]],
    description: ['', [Validators.required, Validators.maxLength(65534)]],
    pictureDto: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.patchImageDefault();
    this.dataSignal.getAllMaterialsTypes();
  }

  private patchImageDefault(): void {
    this.subscriptions.push(
      this.fileService.patchImage(this.fileService.imageMaterialDefault).subscribe({
        next: (fileDto) => this.newMaterialForm.get('pictureDto')!.setValue(fileDto.fileName),
        error: (err) => this.anguilleSignal.changeMessage("Erreur lors de la récupération de l'image par défaut"),
      })
    )
  }

  toggleDropdown(dropdownClicked : 'Category'): void {
    this[`is${dropdownClicked}DropdownOpen`] = !this[`is${dropdownClicked}DropdownOpen`];
  }

  onMaterialTypeClicked(valueClicked : string): void {
    this.newMaterialForm.controls['materialType'].setValue(valueClicked);
  }

  submitNewMaterialForm(): void {
    this.formHelper.isFormSubmit = true;
    if (this.newMaterialForm.valid) {
      const CREATE_MATERIAL: CreateMaterial = this.formHelper.formatFormWithMainPicture<CreateMaterial>(this.newMaterialForm, this.fileService.picture!);
      this.adminMaterialSignal.post(CREATE_MATERIAL);
      this.formHelper.resetAllValues(this.newMaterialForm);
      this.patchImageDefault();
    }
  }
}
