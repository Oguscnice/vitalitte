import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder){}
    
  signInForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', Validators.required],
  });
  
}
