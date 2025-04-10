import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '../loader/loader.component';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  imports: [ ReactiveFormsModule, LoaderComponent, NgClass, NgStyle ],
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {

  isFormSubmit: boolean = false;
  hasErrors: boolean = false;
  isLoaderVisible: boolean = false;
  isDropdownOpen: boolean = false;

  lastnameValue: string = '';
  firstnameValue: string = '';
  emailValue: string = '';
  phoneValue: string = '';
  themeValue: string = '';
  messageValue: string = '';

  themeList: string[] = [
    "Carnets",
    "Ateliers",
    "Autre sujet"
  ]

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  changeLastnameValue(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    this.lastnameValue = inputElement.value;
  }

  changeFirstnameValue(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    this.firstnameValue = inputElement.value;
  }

  changeEmailValue(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    this.emailValue = inputElement.value;
    this.validateEmail();
  }

  changePhoneValue(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    this.phoneValue = inputElement.value;
  }

  changeThemeValue(themeClicked: string): void {
    this.themeValue = themeClicked;
  }

  changeMessageValue(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    this.messageValue = inputElement.value;
  }

  validateEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.emailValue);
  }

  validatePhone(): boolean {
    const phoneRegex = /^[0-9]{10}$/;
    return (this.phoneValue.match(phoneRegex) !== null);
  }

  checkStringValidity(value: string, min: number, max: number): boolean {
    if (value && value.length >= min && value.length <= max) {
      return true;
    }
    return false;
  }

  changeSubmitted(): void {
    this.isFormSubmit = true;
    if (this.checkErrors()) {
      this.isLoaderVisible = true;
    }
  }

  checkErrors(): boolean {
    if (
      this.checkStringValidity(this.emailValue, 3, 255) &&
      this.validateEmail() &&
      this.phoneValue &&
      this.validatePhone() &&
      this.themeValue !== '' &&
      this.checkStringValidity(this.lastnameValue, 3, 255) &&
      this.checkStringValidity(this.firstnameValue, 3, 255) &&
      this.checkStringValidity(this.messageValue, 10, 1000)
    ) {
      this.hasErrors = false;
      return true;
    }else{
      this.hasErrors = true;
      return false;
    }
  }
}
