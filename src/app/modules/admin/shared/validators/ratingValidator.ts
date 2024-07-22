import { AbstractControl, ValidatorFn } from '@angular/forms';

export function ratingValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    // Vérifie que ce soit un nombre
    if (typeof value !== 'number') {
      return { 'invalidRating': { value: control.value } };
    }

    // Vérifie que ce soit entre 0.5 et 5
    if (value < 0.5 || value > 5) {
      return { 'invalidRatingRange': { value: control.value } };
    }

    // Vérifie que ce soit un multiple de 0.5
    if (value * 2 !== Math.floor(value * 2)) {
      return { 'invalidRatingStep': { value: control.value } };
    }

    return null;
  };
}
