import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent{
  
  constructor(private formBuilder: FormBuilder){
      super()
    }
    
  signInForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', Validators.required],
  });
  
}
