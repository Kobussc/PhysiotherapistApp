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
      dateOfBirth: [''],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });
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

  save() {
    this.markAsTouched(this.registrationForm);
    console.log(this.registrationForm.valid);
    console.log(this.registrationForm.value);
      if (!this.registrationForm.valid) {
        alert('Prosze wypełnić wszystkie wymagane pola');
      }
    //   this.registrationService.add(this.registrationForm.value).subscribe(
    //     response => {
    //       // this.toast.success(`Pomyślnie dodano.`);
    //       this.router.navigate([`/registration/calendar/`]);
    //     },
    //     err => {
    //       // this.toast.error(`Błąd serwera, ${err}`);
    //     });
    // } else {
    //   // this.toast.error(`Wypełnij wszystkie wymagane pola.`);
    // }
  }
}
