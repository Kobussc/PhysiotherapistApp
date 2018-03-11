import { PersonService } from './../personal/person.service';
import { Person } from './../personal/person.model';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { IMyDpOptions, IMyDateModel, IMyInputFieldChanged, IMyOptions } from 'mydatepicker';
import { FormGroup, FormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IMyLocales } from 'mydatepicker/dist/interfaces';
import { ToastrService } from 'ngx-toastr';
import { Response } from '@angular/http';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [PersonService]
})
export class CalendarComponent implements OnInit {

  dateFormatted: string;
  personID: string;
  calendarForm: FormGroup;
  personList: Person[];

  public MyDatePickerOptions: IMyDpOptions = {
    firstDayOfWeek: 'mo',
    disableWeekends: true,
    inline: true,
    dateFormat: 'dd.mm.yyyy',
    allowDeselectDate: false,
    disableUntil: {year: 0, month: 0, day: 0}
  };

  constructor(
    private route: ActivatedRoute,
    private firebase: AngularFireDatabase,
    private fb: FormBuilder,
    private router: Router,
    private personService: PersonService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.disableUntil();
    const id = window.location.href;
    this.personID = id.slice(47, 70);

    this.calendarForm = this.fb.group({
      $key: [''],
      myDate: [null, Validators.required],
      myTime: [null, Validators.required]
    });
    this.blockButtons();

    const x = this.personService.getData();
    x.snapshotChanges().subscribe(item => {
      item.forEach(element => {
        const calendarForm = this.calendarForm;
        this.personList = [];
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        if (this.personID === y['$key']) {
          this.calendarForm.patchValue({$key: this.personID});
          this.personList.push(y as Person);
      }
      });
    });
  }

  disableUntil() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const copy = this.getCopyOfOptions();
    copy.disableUntil = {year: d.getFullYear(),
                         month: d.getMonth() + 1,
                         day: d.getDate()};
    this.MyDatePickerOptions = copy;
}

getCopyOfOptions(): IMyOptions {
    return JSON.parse(JSON.stringify(this.MyDatePickerOptions));
}

  blockButtons() {
    (<HTMLInputElement> document.getElementById('8:00')).disabled = true;
    (<HTMLInputElement> document.getElementById('9:00')).disabled = true;
    (<HTMLInputElement> document.getElementById('10:00')).disabled = true;
    (<HTMLInputElement> document.getElementById('11:00')).disabled = true;
    (<HTMLInputElement> document.getElementById('12:00')).disabled = true;
    (<HTMLInputElement> document.getElementById('13:00')).disabled = true;
    (<HTMLInputElement> document.getElementById('14:00')).disabled = true;
    (<HTMLInputElement> document.getElementById('15:00')).disabled = true;
  }
  clearButtons() {
    (<HTMLInputElement> document.getElementById('8:00')).disabled = false;
    (<HTMLInputElement> document.getElementById('9:00')).disabled = false;
    (<HTMLInputElement> document.getElementById('10:00')).disabled = false;
    (<HTMLInputElement> document.getElementById('11:00')).disabled = false;
    (<HTMLInputElement> document.getElementById('12:00')).disabled = false;
    (<HTMLInputElement> document.getElementById('13:00')).disabled = false;
    (<HTMLInputElement> document.getElementById('14:00')).disabled = false;
    (<HTMLInputElement> document.getElementById('15:00')).disabled = false;
  }

  pickDate(event: IMyDateModel) {
    this.clearButtons();
    this.calendarForm.patchValue({myTime: null});
    this.dateFormatted = event.formatted;
    this.calendarForm.patchValue({myDate: this.dateFormatted});
    const datePicked = this.dateFormatted;
    let dateTrue = false;

    const z = this.personService.getData();
    z.snapshotChanges().subscribe(item => {
      this.personList = [];
      item.forEach(element => {
        const u = element.payload.toJSON();
          this.personList.push(u as Person);
          Object.getOwnPropertyNames(u).forEach(
            function(val, idx, arra) {
              if (val === 'myDate') {
                if (datePicked === u[val]) {
                  dateTrue = true;
                }
              }
              if (dateTrue === true) {
                if (val === 'myTime') {
                  (<HTMLInputElement> document.getElementById(u[val])).disabled = true;
                  dateTrue = false;
                }
              }
            }
          );
      });
    });
  }

  pickTime(time: string) {
    this.calendarForm.patchValue({ myTime: time });
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
    this.calendarForm.patchValue({myDate: this.dateFormatted});

    this.markAsTouched(this.calendarForm);
      if (!this.calendarForm.valid) {
        this.toastr.warning('Prosze wypełnić wszystkie wymagane pola');
      } else {
        this.toastr.success('Wybrano date wizyty oraz godzine.');
        this.personService.updatePerson(this.calendarForm.value);
        this.router.navigate([`/registration/summary`, {id: this.personID}]);
      }
  }
}
