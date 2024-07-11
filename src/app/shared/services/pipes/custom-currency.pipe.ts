import {inject, Pipe, PipeTransform} from '@angular/core';
import {CurrencyPipe} from "@angular/common";

@Pipe({
  name: 'customCurrency',
  standalone: true
})
export class CustomCurrencyPipe implements PipeTransform {

  private currencyPipe = inject(CurrencyPipe);

  transform(value: number, currencyCode: string = 'EUR', digitsInfo: string = '1.2-2', locale: string = 'fr'): string {

    // Utiliser le CurrencyPipe pour formater la valeur sans le symbole
    const formattedValue = this.currencyPipe.transform(value, currencyCode, 'symbol');

    // Vérifier que formattedValue n'est pas null
    if (formattedValue) {
      // Supprimer le symbole de la monnaie du début
      const valueWithoutCurrencySymbol = formattedValue.replace(/[^\d.,]/g, '');

      // Ajouter le symbole de la monnaie à droite
      return `${valueWithoutCurrencySymbol} €`;
    }

    // Si formattedValue est null, retourner null
    return "0 €";
  }

}
