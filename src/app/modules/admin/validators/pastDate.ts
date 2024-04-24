import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // retourne null si aucune valeur n'est entrée
    }

    const inputDate = new Date(control.value);
    const currentDate = new Date();
    
    // Assurez-vous que l'heure n'affecte pas la comparaison
    currentDate.setHours(0, 0, 0, 0); 

    // Vérifie si la date entrée est dans le futur
    return inputDate > currentDate ? null : { 'pastDate': "La Date d'expiration doit être supérieur à la date d'aujourd'hui" };
  };
}
