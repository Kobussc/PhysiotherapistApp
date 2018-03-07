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
    const router = this.router;
    const ziom = firebase.auth().currentUser;
    if (ziom) {
      router.navigate(['/blog/editor']);
    } else {
      router.navigate(['blog/reader/readerList']);
    }
  }

}
