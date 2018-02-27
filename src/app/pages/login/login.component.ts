import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PagesComponent } from './../pages.component';
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

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private pages: PagesComponent
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
  const email = this.loginForm.get('email').value;
  const password = this.loginForm.get('password').value;
  const router = this.router;
  const toastr = this.toastr;
  const pages = this.pages;

  if (!this.loginForm.valid) {
    this.toastr.warning('Prosze wypełnić wszystkie pola');
  } else {
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    toastr.error('Wprowadzone hasło jest nieprawidłowe');
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      router.navigate(['/admin-panel']);
      pages.showLogout();
    } else {
    }
  });
}
}

}
