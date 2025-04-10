import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validator personnalisé pour vérifier que confirmPassword est identique à password
export function confirmPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const parent = control.parent;

    if (!parent || !parent.get('password')) {
      return null; // Si le contrôle n'a pas de parent ou pas de contrôle password associé, ne pas valider
    }

    const password = parent.get('password')!.value;
    const confirmPassword = control.value;

    // Vérifiez si les deux champs correspondent
    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}
