import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const router = this.router;
    const toastr = this.toastr;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('logout').style.display = 'block';
        document.getElementById('admin').style.display = 'block';
      } else {
        document.getElementById('login').style.display = 'block';
        document.getElementById('logout').style.display = 'none';
        document.getElementById('admin').style.display = 'none';
      }
    });
   }

  logout() {
    const router = this.router;
    const toastr = this.toastr;
    firebase.auth().signOut().then().catch(function(error) {
      toastr.warning(error);
    });
    router.navigate(['/home']);
    location.reload();
    document.getElementById('logout').style.display = 'none';
    document.getElementById('admin').style.display = 'none';
    document.getElementById('login').style.display = 'block';
  }

  showLogout() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('logout').style.display = 'block';
    document.getElementById('admin').style.display = 'block';
  }
  scroll(id: string) {
    this.router.navigate(['./home']);
    const el = document.getElementById(id);
    el.scrollIntoView({behavior: 'smooth'});
  }

}
