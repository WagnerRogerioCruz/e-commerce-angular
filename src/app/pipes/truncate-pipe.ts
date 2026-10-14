import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | undefined | null , limite: number = 30): string {

    if (!value) {
      return '';
    }

    if (value.length <= limite) {
      return value;
    }

    return value.substring(0, limite) + '...';
  }
}
