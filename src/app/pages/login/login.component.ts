import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/base.component';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent{
  
  private formBuilder = inject(FormBuilder);
    
  signInForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', Validators.required],
  });
  
}
