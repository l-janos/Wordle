import {Component, Input} from '@angular/core';
import {GuessRowComponent} from '../guess-row/guess-row.component';
import {CommonModule} from '@angular/common';
import {Guess} from '../../models/guess';

@Component({
  selector: 'app-board',
  imports: [CommonModule, GuessRowComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  @Input() guesses: Guess[] = [];
}
