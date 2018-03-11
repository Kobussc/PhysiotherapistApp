import { ServicesComponent } from './../services/services.component';
import { AboutMeComponent } from './../about-me/about-me.component';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AboutMeComponent, ServicesComponent],
  animations: [
    trigger('photoState', [
      state('move', style({
        transform: 'translateX(-100%)',
      })),
      state('move1', style({
        transform: 'translateX(0%)',
      })),
      state('rotate', style({
        transform: 'rotateZ(360deg)',
      })),
      state('spin', style({
        transform: 'rotateY(180deg) rotateZ(0deg)',
      })),
      transition('* => *', animate('500ms ease')),
    ]),
  ]
})
export class HomeComponent implements OnInit {

  position: string;

  rotate: string;

  constructor(
    private aboutMe: AboutMeComponent,
    private services: ServicesComponent
  ) {
    setTimeout(() => {
      this.changePosition('spin');
    }, 1000);
   }

  ngOnInit() {
    // const services = this.services;
    // const aboutMe = this.aboutMe;

    // window.onscroll = function() {
    //   aboutMe.rotateItem();
    //   services.slide();
    //   services.slide2();
    //   services.slide3();
  // }.bind(this);
}

  changePosition(newPosition: string) {
    this.position = newPosition;
  }
}
