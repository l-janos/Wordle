import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'letterColor'
})
export class LetterColorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
