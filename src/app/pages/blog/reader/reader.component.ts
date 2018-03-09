import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    const ziom = firebase.auth().currentUser;
    if (ziom) {
      this.router.navigate(['/blog/editor']);
    } else {
      this.router.navigate(['/blog/reader/readerList']);
    }
  }

}
