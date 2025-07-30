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

    await this.gameService.fetchTargetWord();

    this.guesses = Array(this.gameService.maxGuesses).fill(null)
      .map(()=>this.gameService.getEmptyGuesses());
    this.isLoading = false;
  }
  protected updateCurrentRowDisplay(){
    const row = this.guesses[this.currentRowIndex];
    for (let i = 0; i < 5; i++){
      row[i].letter = this.currentInput[i] || '';
      row[i].state = '';
    }
  }
  protected onKeyPress(letter:string){

    if (this.isCorrect || this.currentInput.length >= 5) return;
    this.currentInput += letter.toUpperCase();
    this.updateCurrentRowDisplay();
  }
  protected onbackSpace(){
    if (this.isGameOver || this.currentInput.length === 0) return;
    this.currentInput = this.currentInput.slice(0, -1);
    this.updateCurrentRowDisplay();
  }
  protected onEnter(){
    if(this.isGameOver || this.currentInput.length !== 5) return;

    this.guesses[this.currentRowIndex] = this.gameService.evaluateGuess(this.currentInput);

    const target = this.gameService.getTargetWord();

    if(this.currentInput.toUpperCase() === target){
      this.isCorrect = true;
      this.isGameOver = true;

    } else if(this.currentRowIndex === this.guesses.length-1){
      this.isGameOver = true;
    } else{
      this.currentRowIndex++;
      this.currentInput = '';
    }
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
