import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryDto } from 'src/app/shared/interfaces/Category';
import { MaterialDto } from 'src/app/shared/interfaces/Material';
import { TransformApiPostService } from '../../../services/transform-api-post.service';
import { FormBuilder } from '@angular/forms';
import { FileUploadService } from '../../../services/file-upload.service';
import { CreateNotebook } from '../../../interfaces/Notebook';

@Component({
  selector: 'app-post-notebook',
  templateUrl: './post-notebook.component.html',
  styleUrls: ['./post-notebook.component.scss']
})
export class PostNotebookComponent {

  constructor(
    private fileUploadService: FileUploadService,
    private formBuilder: FormBuilder,
    private transformApiPostService : TransformApiPostService
  ){}

  @Input() materialTypes! : string[];
  @Input() materials! : MaterialDto[];
  @Input() categories! : CategoryDto[];

  @Output() newNotebook: EventEmitter<CreateNotebook> = new EventEmitter();

  isFormVisible : boolean = false;
  imageToDisplay : string = this.fileUploadService.imageNotebookDefault
  isDropdownOpen : boolean = false;
  isFormSubmit : boolean = false;

  fileSizeMax: number = this.fileUploadService.SIZE_MAX;
  fileSize!: number;

  public toolBarConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins : 'lists',
    menubar: false,
    toolbar: 'undo redo cut copy paste bold italic strikethrough numlist bullist styles alignleft aligncenter alignright alignjustify ',
  };
}
