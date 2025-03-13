import { Pipe, PipeTransform } from '@angular/core';

@Pipe({

  name: 'addEuroCurrency'
})
export class AddEuroCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    return (value + '€');
  }
}
