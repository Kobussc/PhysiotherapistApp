import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { IMyDpOptions, IMyDateModel, IMyInputFieldChanged, IMyOptions } from 'mydatepicker';
import { FormGroup, FormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Calendar } from './calendar.model';
import { CalendarService } from './calendar.service';
import { IMyLocales } from 'mydatepicker/dist/interfaces';
import { ToastrService } from 'ngx-toastr';
import { Response } from '@angular/http';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [CalendarService]
})
export class CalendarComponent implements OnInit {

  dateFormatted: string;
  sliced: string;
  calendarId: string;
  calendarForm: FormGroup;
  calendarList: Calendar[];
  cList: AngularFireList<any>;
  selectedDay: Calendar = new Calendar();

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
    private calendarService: CalendarService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.disableUntil();
    const id = window.location.href;
    this.sliced = id.slice(47, 70);

    this.calendarForm = this.fb.group({
      myDate: [null, Validators.required],
      myTime: [null, Validators.required],
      personId: ['']
    });
    this.blockButtons();
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
    const today = new Date();
    const clicked = event.date;
    // if (clicked.toDateString() < today.toDateString()) {

    // }
    this.clearButtons();
    this.calendarForm.patchValue({myTime: null});
    this.dateFormatted = event.formatted;
    this.calendarForm.patchValue({myDate: this.dateFormatted});
    const datePicked = this.calendarForm.get('myDate').value;
    let dateTrue = false;
    let timeGet = '';

    const z = this.calendarService.getData();
    z.snapshotChanges().subscribe(item => {
      this.calendarList = [];
      item.forEach(element => {
        const u = element.payload.toJSON();
          this.calendarList.push(u as Calendar);
          Object.getOwnPropertyNames(u).forEach(
            function(val, idx, arra) {
              if (val === 'myDate') {
                if (datePicked === u[val]) {
                  dateTrue = true;
                }
              }
              if (dateTrue === true) {
                if (val === 'myTime') {
                  timeGet = u[val];
                  (<HTMLInputElement> document.getElementById(timeGet)).disabled = true;
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

  save(calendar: Calendar) {
    this.calendarForm.patchValue({personId: this.sliced});
    this.calendarForm.patchValue({myDate: this.dateFormatted});
    this.markAsTouched(this.calendarForm);
      if (!this.calendarForm.valid) {
        this.toastr.warning('Prosze wypełnić wszystkie wymagane pola');
      } else {
        this.toastr.success('Wybrano date wizyty oraz godzine.');
        this.cList = this.firebase.list('calendars');
        const newPostRef = this.cList.push(this.calendarForm.value);
        const postId = newPostRef.key;
        this.router.navigate([`/registration/summary`, {id: postId}]);
      }
  }
}
