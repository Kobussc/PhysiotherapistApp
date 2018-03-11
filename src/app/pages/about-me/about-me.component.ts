import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
  animations: [
    trigger('round', [
      state('rotate', style({
        transform: 'rotateZ(360deg)',
      })),
      transition('* => *', animate('500ms ease')),
    ]),
  ]
})
export class AboutMeComponent implements OnInit {

  rotate: string;

  constructor() { }

  ngOnInit() {
    // window.onscroll = function() {
    //   this.rotateItem();
    // }.bind(this);
  }

  rotateItem() {
    // if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
    // this.rotate = 'rotate';
    // } else {
    //   this.rotate = '';
    // }
  }

}
