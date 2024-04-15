import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'addEuroCurrency'
})
export class AddEuroCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    return (value + '€');
  }
}