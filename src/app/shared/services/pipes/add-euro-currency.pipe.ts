import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addEuroCurrency'
})
export class AddEuroCurrency implements PipeTransform {
  transform(value: number): string {
    return (value + '€');
  }
}