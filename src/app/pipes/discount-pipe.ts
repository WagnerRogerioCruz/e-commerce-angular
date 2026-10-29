import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
})
export class DiscountPipe implements PipeTransform {
  transform(value: number | undefined | null, percentual: number): number {

    if (value === undefined || value === null || isNaN(Number(value))) {
      return 0
    }
    
    const valorComDesconto = value - (value * (percentual/100));
    return valorComDesconto;
  }
}
