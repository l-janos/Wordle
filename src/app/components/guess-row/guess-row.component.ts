import {Component, Input} from '@angular/core';
import {LetterColorPipe} from '../../pipes/letter-color.pipe';
import {CommonModule} from '@angular/common';
import {Guess} from '../../models/guess';

@Component({
  selector: 'app-guess-row',
  imports: [CommonModule, LetterColorPipe],
  templateUrl: './guess-row.component.html',
  styleUrl: './guess-row.component.css'
})
export class GuessRowComponent {
  @Input() guess: Guess = [];
}
