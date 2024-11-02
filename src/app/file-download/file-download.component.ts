import {Component, inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-file-download',
  standalone: false,
  templateUrl: './file-download.component.html',
  styleUrl: './file-download.component.scss'
})
export class FileDownloadComponent {

  private formBuilder = inject(FormBuilder);
  private http = inject(HttpClient);
  selectedFile: File | null = null;
  file: any = null;

  fileForm = this.formBuilder.group({
    file: [null, [Validators.required]]
  });

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      console.log(formData)
      this.http.post('http://localhost:8080/api/upload', formData).subscribe({
        next: (response) => console.log('File uploaded successfully', response),
        error: (err) => console.error('Upload error', err),
      });
    }
  }

  onGet() {
    this.http.get('http://localhost:8080/api/upload/1', {
      responseType: 'blob'  // Important : spécifie que la réponse sera de type Blob
    }).subscribe({
      next: (blob) => {
        // Créer une URL temporaire à partir du blob
        const reader = new FileReader();
        reader.readAsDataURL(blob);  // Convertir Blob en Base64 URL
        reader.onloadend = () => {
          this.file = reader.result;  // Affecter le Base64 URL à la variable
        }
      },
      error: (err) => console.error('Upload error', err),
    });
  }
}
