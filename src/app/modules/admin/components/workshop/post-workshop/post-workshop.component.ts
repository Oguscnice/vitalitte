import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { CreateWorkshop } from '../../../shared/interfaces/Workshop';
import { DecimalPipe, NgClass, TitleCasePipe } from '@angular/common';
import { priceValidator } from '../../../shared/validators/priceValidators';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CounterZeroIfEmpty } from 'src/app/shared/services/pipes/counter-zero-if-empty.pipe';
import { ApiBanService } from '../../../shared/services/api/api-ban.service';
import { TOOLS_BAR_CONFIG_EDITOR } from '../../../shared/variables/Other';
import {AdminWorkshopSignalService} from "../../../shared/services/admin-workshop-signal.service";
import {FormHelperService} from "../../../shared/services/form-helper.service";
import {BaseComponent} from "../../../../../base.component";
import {FileService} from "../../../../../shared/services/file.service";
import {AnguilleSignalService} from "../../../../../shared/services/anguille-signal.service";

@Component({
  selector: 'app-post-workshop',
  standalone: true,
  imports: [ NgClass, ReactiveFormsModule, TitleCasePipe, DecimalPipe, EditorModule, CounterZeroIfEmpty ],
  templateUrl: './post-workshop.component.html',
  styles: [` @import "../../../scss/admin-general.scss"; `]
})

export class PostWorkshopComponent extends BaseComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private adminWorkshopSignal = inject(AdminWorkshopSignalService);
  private anguilleSignal = inject(AnguilleSignalService);
  apiBanService = inject(ApiBanService);
  fileService = inject(FileService);
  formHelper = inject(FormHelperService);

  toolBarConfig = TOOLS_BAR_CONFIG_EDITOR

  newWorkshopForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.maxLength(65534)]],
    date: ['', [Validators.required]],
    address: ['', [Validators.required]],
    price: ['', [Validators.required, priceValidator()]],
    pictureDto: ['', [Validators.required]],
    registrations: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.patchImageDefault();
  }

  private patchImageDefault(): void {
    this.subscriptions.push(
      this.fileService.patchImage(this.fileService.imageWorkshopDefault).subscribe({
        next: (fileDto) => this.newWorkshopForm.get('pictureDto')!.setValue(fileDto.fileName),
        error: (err) => this.anguilleSignal.changeMessage("Erreur lors de la récupération de l'image par défaut"),
      })
    )
  }

  onAddressClicked(addressClicked: string): void {
    this.newWorkshopForm.get('address')!.setValue(addressClicked);
  }

  submitNewWorkshopForm(): void {
    this.formHelper.isFormSubmit = true;
    if (this.newWorkshopForm.valid) {
      const CREATED_WORKSHOP: CreateWorkshop = this.formHelper.formatFormWithMainPicture<CreateWorkshop>(this.newWorkshopForm, this.fileService.picture!)
      this.adminWorkshopSignal.post(CREATED_WORKSHOP);
      this.formHelper.resetAllValues(this.newWorkshopForm);
      this.patchImageDefault();
    }
  }
}
