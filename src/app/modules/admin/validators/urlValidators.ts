import { AbstractControl, ValidatorFn } from '@angular/forms';

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    
    if (!control.value) {
      return { 'invalidUrl': true };; // Valeur vide, la validation échoue
    }

    const urlPattern = /^https?:\/\/[^\s$.?#].[^\s]*$/;

    if (urlPattern.test(control.value)) {
      return null; // La valeur correspond au motif, la validation réussit
    } else {
      return { 'invalidUrl': true }; // La valeur ne correspond pas au motif, la validation échoue
    }
  };
}
