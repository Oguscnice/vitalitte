import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function quantityValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const isValid = !isNaN(value) && value >= 1 && value <= 5;
    return isValid ? null : { 'quantityError': 'quantité invalide' };
  };
}
