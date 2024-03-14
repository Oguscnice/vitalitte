import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CreateMaterial } from 'src/app/shared/interfaces/Material';
import { FileUploadService } from '../../../services/file-upload.service';
import { urlValidator } from '../../../validators/urlValidators';
import { EMaterialType } from 'src/app/shared/interfaces/EMaterialType';

@Component({
  selector: 'app-post-material',
  templateUrl: './post-material.component.html',
  styleUrls: ['./post-material.component.scss']
})
export class PostMaterialComponent {

  constructor(
    private fileUploadService: FileUploadService,
    private formBuilder: FormBuilder,
  ){}

  isFormVisible : boolean = false;
  imageToDisplay : string = this.fileUploadService.imageMaterialDefault

  materialTypeSelected : (keyof typeof EMaterialType) | null = null
  @Input() materialTypes! : (keyof typeof EMaterialType)[];
  @Output() newMaterial: EventEmitter<CreateMaterial> = new EventEmitter();

  newMaterialForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    price: [0, [Validators.required]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    picture: ['', [urlValidator]]
  });

  ngOnInit(): void{

  }



  onMaterialTypeSelected(event: Event): void {
    const newMaterialTypeSelected = (event.target as HTMLSelectElement).value;
    // Vérifier si genderSelected est une clé valide de votre enum Gender
    if (Object.values(EMaterialType).includes(newMaterialTypeSelected as EMaterialType)) {
      this.materialTypeSelected = (newMaterialTypeSelected as keyof typeof EMaterialType);
    } else {
      this.materialTypeSelected = null
    }  
  }

  submitNewMaterialForm(): void{
    if(this.newMaterialForm.valid && this.materialTypeSelected){
      this.newMaterial.emit();
    }
  }
}
