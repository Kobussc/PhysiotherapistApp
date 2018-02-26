import { ToastrService } from 'ngx-toastr';
import * as firebase from 'firebase';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  login() {
  const email = (<HTMLInputElement> document.getElementById('inputEmail')).value;
  const password = (<HTMLInputElement> document.getElementById('inputPassword')).value;
  const router = this.router;
  const toastr = this.toastr;

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      const email1 = user.email;
      toastr.success('zalogowano ' + email1);
      router.navigate(['/admin-panel']);
    } else {
      toastr.warning('nie zalogowano');
    }
  });

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    toastr.error('Blad : ' + errorMessage);
  });
}

}
