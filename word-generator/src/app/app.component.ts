import { Component } from '@angular/core';
import arrayWords from '../utils/words';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'word-generator';
  words = '';
  limit: number = 10;
  handleSlidechange = (newLimit: any) => {
    console.log(newLimit.value);
    this.limit = newLimit.value;
  };
  generateWords = () => {
    this.words = arrayWords.slice(0, this.limit).join(' ');
  };
}
