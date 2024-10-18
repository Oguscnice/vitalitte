import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {confirmPasswordValidator} from "../../shared/validators/ConfirmPasswordValidator";
import {NgClass} from "@angular/common";
import {BaseComponent} from "../../base.component";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './signup.component.html',
  styles: [`
    @import "src/app/scss/variables.scss";
    @import "src/app/scss/forms.scss";
    @import "src/app/scss/dropdowns.scss";
    @import "src/app/scss/buttons.scss";

    h1 {
      margin: $normal-margin 0;
      color: $lilac-dark;
    }

    form {
      margin-top: 0;
    }

    color-black {
      color: black;
    }

    .color-red {
      color: red;
    }

    .color-green {
      color: green;
    }

    small {
      margin-top: $half-padding;
      span {
        padding: 0 $half-padding;
        color: black ;
      }
    }
  `]
})
export class SignupComponent extends BaseComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  isFormSubmit: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  signUpForm = this.formBuilder.group({
    firstname: ['', [Validators.required, Validators.maxLength(255)]],
    lastname: ['', [Validators.required, Validators.maxLength(255)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
    password: ['', [Validators.required, Validators.maxLength(255)]],
    confirmPassword: ['', [Validators.required, confirmPasswordValidator()] ],
  })

  canRegister!: boolean;

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.canRegister().subscribe({
        next: (res) => this.canRegister = res,
        error: (err) => console.log(err)
      })
    )
  }

  private getPasswordFormValue(): string {
    const PASSWORD = this.signUpForm.get('password')!.value;
    return PASSWORD ?? '';
  }

  hasUpperCase(): boolean {
    return /[A-Z]/.test(this.getPasswordFormValue());
  }

  hasLowerCase(): boolean {
    return /[a-z]/.test(this.getPasswordFormValue());
  }

  hasMinimumLength(): boolean {
    return this.getPasswordFormValue().length >= 8;
  }

  hasSpecialCharacter(): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(this.getPasswordFormValue());
  }

  isPasswordValid(): boolean {
    return this.hasUpperCase() &&
      this.hasLowerCase() &&
      this.hasMinimumLength() &&
      this.hasSpecialCharacter();
  }

  submitSignUpForm(): void {
    this.isFormSubmit = true;

    if (this.signUpForm.valid && this.isPasswordValid()) {
      this.authService.register(this.signUpForm);
    }
  }
}
