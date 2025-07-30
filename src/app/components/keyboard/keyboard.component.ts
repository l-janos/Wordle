import {Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-keyboard',
  imports: [CommonModule],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.css'
})
export class KeyboardComponent {
  @Output() letter = new EventEmitter<string>();
  @Output() enter = new EventEmitter<void>();
  @Output() backspace = new EventEmitter<void>();

  rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "h", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"]
  ]
}
