import { Component, HostListener } from '@angular/core';
import {BoardComponent} from '../../components/board/board.component';
import {KeyboardComponent} from '../../components/keyboard/keyboard.component';
import {LetterColorPipe} from '../../pipes/letter-color.pipe';
import {CommonModule} from '@angular/common';
import {Guess} from '../../models/guess';
import {GameLogicService} from '../../services/game-logic.service';

@Component({
  selector: 'app-game',
  imports: [BoardComponent, KeyboardComponent, LetterColorPipe, CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  protected guesses: Guess[] = [];
  protected currentInput: string = "";
  protected isGameOver: boolean = false;
  protected isCorrect : boolean = false;
  protected currentRowIndex: number = 0;
  protected isLoading: boolean = true;

  constructor(public gameService: GameLogicService) {
    this.startNewGame();
  }

  async startNewGame() {
    this.isLoading = true;
    this.isCorrect = false;
    this.isGameOver = false;
    this.guesses = [];
    this.currentInput = "";
    this.currentRowIndex = 0;
    //TODO: metódust kell majd használni a gameService-val
  }
  protected updateCurrentRowDisplay(){
    //TODO: Mindig a megfelelő sort frissítjük
  }
  protected onKeyPress(letter:string){
    //TODO: Melyik billentyűt nyomjuk le gépen, vagy telefonon
  }
  protected onbackSpace(){
    //TODO: Utolsó karaktert törölni
  }
  protected onEnter(){
    //TODO: Küldje el a tippet
  }
  protected onRestart(){
    this.startNewGame();
  }
  @HostListener('window:keydown', ['$event'])
  protected handleKeyboardInput(event: KeyboardEvent) {
    if (this.isGameOver || this.isLoading) return

    const key = event.key.toUpperCase();

    if (key == 'ENTER') {
      this.onEnter();
    }   else if(key == 'BACKSPACE'){
      this.onbackSpace();
    } else if (/^[A-Z]$/.test(key)){
      this.onKeyPress(key)
    }
  }

}
