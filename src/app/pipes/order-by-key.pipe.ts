import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByKey'
})
export class OrderByKeyPipe implements PipeTransform {

  transform(value: Array<{ key: string | number, value: any }>): Array<{ key: string | number, value: any }> {
    if (!value || !Array.isArray(value)) {
      return value;
    }
    return value.sort((a, b) => {
      if (typeof a.key === 'number' && typeof b.key === 'number') {
        return a.key - b.key;
      } else {
        return a.key.toString().localeCompare(b.key.toString());
      }
    });
  }
}
