import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  animations: [
    // trigger('round', [
    //   state('rotate', style({
    //     transform: 'rotateZ(360deg)',
    //   })),
    //   transition('* => *', animate('500ms ease')),
    // ]),
    trigger('flyInOut', [
      state('in', style({
        transform: 'translateX(0%)',
        opacity: 1
      })),
      state('in2', style({
        transform: 'translateX(0%)',
        opacity: 1
      })),
      state('in3', style({
        transform: 'translateX(0%)',
        opacity: 1
      })),
      state('down', style({
        opacity: 1
      })),
      transition('* => *', animate('1500ms ease'))
    ])
  ]
})
export class ServicesComponent implements OnInit {

  in: string;
  in2: string;
  in3: string;
  down: string;
  down1: string;
  down2: string;

  constructor() { }

  ngOnInit() {
    window.onscroll = function() {
      this.slide();
      this.slide2();
      this.slide3();
    }.bind(this);
   }

slide() {
  if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
    console.log('dziala slide');
    this.in = 'in';
    this.down = 'down';
  }
}
slide2() {
  if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
    this.in2 = 'in';
    this.down1 = 'down';
  }
}
slide3() {
  if (document.body.scrollTop > 1600 || document.documentElement.scrollTop > 1600) {
    this.in3 = 'in';
    this.down2 = 'down';
  }
}

// rotateItem() {
//   if (document.body.scrollTop > 1150 || document.documentElement.scrollTop > 1150) {
//   this.rotate = 'rotate';
//   console.log('dziala');
//   } else {
//     this.rotate = '';
//     console.log('nie dziala');
//   }
// }


}
