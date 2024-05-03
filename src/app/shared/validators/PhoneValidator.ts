import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // retourne valide si aucune valeur n'est fournie (considérez d'ajouter une validation Required séparément si nécessaire)
    }

    const value = control.value;
    const tenDigitPattern = /^0\d{9}$/; // Commence par 0 et suivi de 9 autres chiffres
    const twelveDigitPattern = /^\+\d{11}$/; // Commence par + et suivi de 11 autres chiffres

    const isValid = tenDigitPattern.test(value) || twelveDigitPattern.test(value);
    return isValid ? null : { 'invalidPhone': true };
  };
}