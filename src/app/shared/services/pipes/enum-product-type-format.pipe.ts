import { Pipe, PipeTransform } from '@angular/core';
import {formatProductType} from "../../function/product-type-format";

@Pipe({
  name: 'enumProductTypeFormat',
  standalone: true
})
export class EnumProductTypeFormatPipe implements PipeTransform {

  transform(value: string, format: 'singular' | 'plural'): string {
    if (!value) {
      return value;
    }
    // Remplacer les tirets (-) et underscores (_) par des espaces
    let formattedValue = value.replace(/[-_]/g, ' ');

    // Utilisez la fonction pour formater la valeur
    try {
      return formatProductType(formattedValue, format);
    } catch (error) {
      console.error(error);
      return value; // Retourner la valeur d'origine en cas d'erreur
    }
  }

}
