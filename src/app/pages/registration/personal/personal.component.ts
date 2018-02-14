import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { FormGroup, NgForm, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { PersonService } from './person.service';
import { ToastrService } from 'ngx-toastr';
import { Response } from '@angular/http';
import { Person } from './person.model';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
  providers: [PersonService]
})
export class PersonalComponent implements OnInit {

  registrationForm: FormGroup;
  personList: AngularFireList<any>;
  private personalId: string;

  constructor(
    private db: AngularFireDatabase,
    private fb: FormBuilder,
    private router: Router,
    private personService: PersonService,
    private toastr: ToastrService
  ) {
    db.object('persons').snapshotChanges().map(action => {
      const $key = action.payload.key;
      const data = { $key, ...action.payload.val() };
      return data;
    }).subscribe(item => console.log(item.$key));
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.registrationForm = this.fb.group({
      dateOfBirth: [''],
      email: ['', Validators.required],
      name: ['', Validators.required],
      pesel: ['', Validators.required],
      phone: ['', Validators.required],
      surname: ['', Validators.required]
    });
  }

  checkDate() {
    const pesel = this.registrationForm.get('pesel').value;
    if (this.isPeselValid(pesel) !== undefined) {return; }

    let year = parseInt(pesel.substring(0, 2), 10);
    let month = parseInt(pesel.substring(2, 4), 10) - 1;
    const day = parseInt(pesel.substring(4, 6), 10) + 1;
    if (month > 20) {
      year = 2000 + year;
      month = month - 20;
    } else {
      year = 1900 + year;
    }
    const date = new Date(year, month, day).toISOString().substring(0, 10);
    this.registrationForm.patchValue({ dateOfBirth: date });
  }

  isPeselValid(pesel: string) {
    if (!/^[0-9]{11}$/.test(pesel)) {
      return { pesel: true };
    }
    const weights = [9, 7, 3, 1, 9, 7, 3, 1, 9, 7];

    const checksum = pesel.substring(0, 10).split('')
      .reduce((acc, c, index) => acc + Number(c) * weights[index], 0);

    if (checksum % 10 !== Number(pesel[10])) {
      return { pesel: true };
    }
  }

  markAsTouched(fg: AbstractControl) {
    if (fg instanceof FormGroup) {
      for (const key in fg.controls) {
        if (fg.controls.hasOwnProperty(key)) {
          this.markAsTouched(fg.controls[key]);
        }
      }
    } else {
      fg.markAsTouched();
    }
  }

  save(person) {
    this.markAsTouched(this.registrationForm);
    console.log(this.registrationForm.valid);
      if (!this.registrationForm.valid) {
        this.toastr.warning('Prosze wypełnić wszystkie wymagane pola');
      } else {
        this.toastr.success('Pomyślnie dodano dane osobowe.');
        this.personService.insertPerson(this.registrationForm.value);
        this.router.navigate([`/registration/calendar`]);
      }
  }
}
