import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'letterColor'
})
export class LetterColorPipe implements PipeTransform {

  transform(state:string):string{
    switch (state){
      case 'correct': return 'bg-green-600 text-white border-green-800'
      case 'present': return 'bg-yellow-400 text-white border-yellow-700'
      case 'absent': return 'bg-gray-400 text-white border-gray-600'
      default: return 'bg-white text-black border border-gray-300'
    }
  }

}
