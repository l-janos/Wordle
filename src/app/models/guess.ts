export interface LetterState {
  letter: string;
  state: 'correct' | 'present' | 'absent' | '' ;
}

export type Guess = LetterState[];
