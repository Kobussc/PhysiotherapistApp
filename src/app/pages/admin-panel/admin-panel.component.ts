import { PagesComponent } from './../pages.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as firebase from 'firebase';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(
    private pages: PagesComponent,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const user = firebase.auth().currentUser;
    if (user) {
    } else {
      this.router.navigate(['/login']);
    }
  }
}
