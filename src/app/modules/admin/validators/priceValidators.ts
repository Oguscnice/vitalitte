import { AbstractControl, ValidatorFn } from '@angular/forms';

export function priceValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const price = control.value;
    
    // Vérifier si le prix est vide ou non
    if (!price) {
      return null; // Si le prix est vide, on ne fait pas de validation supplémentaire
    }

    if (price <= 0) {
      return {'invalidPrice': {value: price}};
    }

    // Vérifier le format du prix
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    if (!priceRegex.test(price)) {
      return {'invalidPriceFormat': {value: price}};
    }

    return null; // Prix valide
  };
}