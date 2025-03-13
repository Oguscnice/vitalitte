import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/base.component';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    @use "../../scss/variables.scss" as variablesScss;
    @use "../../scss/forms.scss";
    @use "../../scss/dropdowns.scss";
    @use "../../scss/buttons.scss";

    h1 {
      margin-top: variablesScss.$normal-margin;
      color: variablesScss.$lilac-dark;
    }

    form {
      margin-top: 0;
    }
  `]
})
export class LoginComponent extends BaseComponent{

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  isFormSubmit: boolean = false;
  showPassword: boolean = false;

  signInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
    password: ['', Validators.required],
  });

  submitLoginForm(): void {
    this.isFormSubmit = true;

    if (this.signInForm.valid) {
      this.authService.login(this.signInForm);
    }
  }
}
