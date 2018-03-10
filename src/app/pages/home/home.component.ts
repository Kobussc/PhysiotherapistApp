import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('photoState', [
      state('move', style({
        transform: 'translateX(-100%)',
      })),
      state('enlarge',   style({
        transform: 'rotateZ(360deg)',
      })),
      state('spin',   style({
        transform: 'rotateY(180deg) rotateZ(0deg)',
      })),
      transition('* => *', animate('500ms ease')),
    ])
  ]
})
export class HomeComponent implements OnInit {

  show = false;
  position: string;
  rotate: string;

  constructor() { }

  ngOnInit() {
  }

  changePosition(newPosition: string) {
    this.position = newPosition;
  }
  rotateItem(newRotate: string) {
    this.rotate = newRotate;
  }

  get stateName() {
    return this.show ? 'show' : 'hide';
  }


  toggle() {
    this.show = !this.show;
  }

}
