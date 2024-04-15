import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'counterZeroIfEmpty'
})
export class CounterZeroIfEmpty implements PipeTransform {
  transform(value: string | null): number {
    return value ? value.length : 0;
  }
}