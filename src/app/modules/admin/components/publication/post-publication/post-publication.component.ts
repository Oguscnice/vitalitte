import {Component, inject, OnInit} from '@angular/core';
import { CreatePublication } from '../../../shared/interfaces/CreatePublication';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { CounterZeroIfEmpty } from 'src/app/shared/services/pipes/counter-zero-if-empty.pipe';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TOOLS_BAR_CONFIG_EDITOR } from '../../../shared/variables/Other';
import {FormHelperService} from "../../../shared/services/form-helper.service";
import {AdminPublicationSignalService} from "../../../shared/services/admin-publication-signal.service";
import {FileService} from "../../../../../shared/services/file.service";
import {AnguilleSignalService} from "../../../../../shared/services/anguille-signal.service";
import {BaseComponent} from "../../../../../base.component";

@Component({
  standalone: true,
  imports: [ NgClass, ReactiveFormsModule, CounterZeroIfEmpty, EditorModule ],
  selector: 'app-post-publication',
  templateUrl: './post-publication.component.html',
  styles: [` @import "../../../scss/admin-general.scss"; `]
})
export class PostPublicationComponent extends BaseComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private adminPublicationSignal = inject(AdminPublicationSignalService);
  private anguilleSignal = inject(AnguilleSignalService);
  fileService = inject(FileService);
  formHelper = inject(FormHelperService);

  toolBarConfig = TOOLS_BAR_CONFIG_EDITOR

  newPublicationForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.maxLength(2000)]],
    pictureDto: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.patchImageDefault();
  }

  private patchImageDefault(): void {
    this.subscriptions.push(
      this.fileService.patchImage(this.fileService.imagePublicationDefault).subscribe({
        next: (fileDto) => this.newPublicationForm.get('pictureDto')!.setValue(fileDto.fileName),
        error: (err) => this.anguilleSignal.changeMessage("Erreur lors de la récupération de l'image par défaut"),
      })
    )
  }

  submitNewPublicationForm(): void {
    this.formHelper.isFormSubmit = true;
    if(this.newPublicationForm.valid){
      const CREATED_PUBLICATION: CreatePublication = this.formHelper.formatFormWithMainPicture<CreatePublication>(this.newPublicationForm, this.fileService.picture!);
      this.adminPublicationSignal.post(CREATED_PUBLICATION);
      this.formHelper.resetAllValues(this.newPublicationForm);
      this.patchImageDefault();
    }
  }
}
