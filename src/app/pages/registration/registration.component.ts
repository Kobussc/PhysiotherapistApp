import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      pesel: ['', Validators.required],
      dateofBirth: [''], disabled: true,
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }
  checkDate() {
    const pesel = this.registrationForm.get('pesel').value;
    const reg = /^[0-9]{11}$/;
    if (reg.test(pesel) === false) {
      return alert('niepoprawny pesel');
    }else {
      let year = parseInt(pesel.substring(0, 2), 10);
      let month = parseInt(pesel.substring(2, 4), 10) - 1;
      const day = parseInt(pesel.substring(4, 6), 10) + 1;
      if (month > 20) {
        year = 2000 + year;
        month = month - 20;
      }else {
        year = 1900 + year;
      }
      const date = new Date(year, month, day).toISOString().substring(0, 10);
      this.registrationForm.patchValue({dateofBirth: date});
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
}
