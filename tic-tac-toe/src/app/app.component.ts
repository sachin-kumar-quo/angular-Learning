import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private toastr: ToastrService) {}
  title = 'tic-tac-toe';
  winMessage: string = '';
  isCross: boolean = false;
  itemArray: string[] = new Array(9).fill('empty');
  WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  reloadGame = () => {
    this.winMessage = '';
    this.isCross = false;
    this.itemArray = new Array(9).fill('empty');
  };

  handleClick = (itemNumber: number) => {
    if (this.winMessage) {
      this.toastr.success(this.winMessage);
      return;
    }
    if (this.itemArray[itemNumber] !== 'empty') {
      this.toastr.warning('This box is already filled!');
      return;
    }
    this.itemArray[itemNumber] = this.isCross ? 'cross' : 'circle';
    this.isCross = !this.isCross;
    this.checkWin();
  };

  checkWin = () => {
    let win = false;
    for (let i = 0; i < this.WINNING_COMBINATIONS.length; i++) {
      const winCombo = this.WINNING_COMBINATIONS[i];
      let a = this.itemArray[winCombo[0]];
      let b = this.itemArray[winCombo[1]];
      let c = this.itemArray[winCombo[2]];
      if (a === b && b === c && a !== 'empty') {
        win = true;
        this.winMessage = `${a} won`;
        this.toastr.success(this.winMessage);
      }
    }
    if (!win) {
      let count = 0;
      for (let i = 0; i < this.itemArray.length; i++) {
        if (this.itemArray[i] !== 'empty') {
          count++;
        }
      }
      if (count === 9) {
        this.winMessage = 'Draw';
        this.toastr.info('this game is a draw');
      }
    }
  };
}
