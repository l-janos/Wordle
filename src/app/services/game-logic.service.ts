import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Guess, LetterState} from "../models/guess";

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {
  private targetWord = '';
  public maxGuesses = 6;

  constructor(private http: HttpClient) {
  }

  public fetchTargetWord(): Promise<void> {
    return this.http.get<string[]>('https://random-word-api.herokuapp.com/word?length=5').toPromise()
      .then(res => {
        const word = res && res[0];
        if (word) {
          this.targetWord = word.toUpperCase();
          console.log("Ez lesz a kitalálandó szó:", word);
        } else {
          console.warn("Nem sikerült a lekérés, fallback: APPLE")
          this.targetWord = "APPLE";
        }
      }).catch(err => {
        console.log(err)
        this.targetWord = "ERROR";
      });
  }

  public getTargetWord(): string{
    return this.targetWord;
  }

  public getEmptyGuesses(): Guess {
    return Array(5).fill(null).map(()=>({letter:'', state:''}))
  }

  public evaluateGuess(guessWord: string): Guess{
    const target = this.targetWord.split('');
    const guess = guessWord.toUpperCase().split('');
    const result: LetterState[] = [];

    const targetCount: Record<string, number> = {};
    target.forEach(l => targetCount[l] = (targetCount[l] || 0) + 1)

    for (let i = 0;i < 5;i++){
      if (guess[i] == target[i]){
        result[i] = {letter: guess[i], state: 'correct'};
        targetCount[guess[i]]--;
      }
    }

    for (let i = 0;i < 5;i++){
      if(!result[i]){
        if (target.includes(guess[i]) && targetCount[guess[i]] >0){
          result[i] = {letter: guess[i], state: 'present'};
          targetCount[guess[i]]--;
        } else{
          result[i] = {letter: guess[i], state: 'absent'};
        }
      }
    }

    return result;
  }
}
