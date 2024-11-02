import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {AdminCategorySignalService} from "../../../shared/services/admin-category-signal.service";
import {FormHelperService} from "../../../shared/services/form-helper.service";
import {TOOLS_BAR_CONFIG_EDITOR} from "../../../shared/variables/Other";
import {CounterZeroIfEmpty} from "../../../../../shared/services/pipes/counter-zero-if-empty.pipe";
import {EditorComponent} from "@tinymce/tinymce-angular";
import {CreateCategory} from "../../../shared/interfaces/CreateCategory";
import {FileService} from "../../../../../shared/services/file.service";

@Component({
  selector: 'app-post-category',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    CounterZeroIfEmpty,
    EditorComponent
  ],
  templateUrl: './post-category.component.html',
  styles: [`
    @import "../../../scss/admin-general.scss";

    input {
      max-width: 320px;
    }
  `]
})
export class PostCategoryComponent {

  private formBuilder  = inject(FormBuilder);
  private adminCategorySignal: AdminCategorySignalService = inject(AdminCategorySignalService);
  protected formHelper = inject(FormHelperService);
  protected readonly toolBarConfig = TOOLS_BAR_CONFIG_EDITOR;
  fileService = inject(FileService);

  newCategoryForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.maxLength(65534)]],
    pictureDto: [null, [Validators.required]]
  });

  submitNewCategoryForm(): void {
    this.formHelper.isFormSubmit = true
    if (this.newCategoryForm.valid) {
      const CREATED_CATEGORY = this.formHelper.formatFormWithMainPicture<CreateCategory>(this.newCategoryForm, this.fileService.picture!);
      this.adminCategorySignal.postCategory(CREATED_CATEGORY);
      this.formHelper.resetAllValues(this.newCategoryForm);
    }
  }
}
