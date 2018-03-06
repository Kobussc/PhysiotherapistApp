import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const router = this.router;
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     router.navigate(['/blog/editor']);
    //   } else {
    //     router.navigate(['/reader']);
    //   }
    // });
    const ziom = firebase.auth().currentUser;
    if (ziom) {
      // User is signed in.
      // this.toastr.success('zalogowano ziom');
      router.navigate(['/blog/editor']);
    } else {
      // No user is signed in.
      // this.toastr.error('dupcia');
      router.navigate(['/reader']);
    }
  }

}
