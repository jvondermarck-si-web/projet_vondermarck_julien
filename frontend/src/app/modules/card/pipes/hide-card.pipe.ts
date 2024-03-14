import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideCard'
})
export class HideCardPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/.(?=.{4})/g, '*');
  }
}
