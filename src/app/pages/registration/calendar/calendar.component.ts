import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { IMyDpOptions, IMyDateModel, IMyInputFieldChanged } from 'mydatepicker';
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

  sliced: string;
  calendarForm: FormGroup;
  calendarList: AngularFireList<any>;
  selectedDay: Calendar = new Calendar();

  public MyDatePickerOptions: IMyDpOptions = {
    firstDayOfWeek: 'mo',
    disableWeekends: true,
    inline: true,
    dateFormat: 'dd.mm.yyyy',
    allowDeselectDate: false
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
    const id = window.location.href;
    this.sliced = id.slice(47, 70);
    console.log(this.sliced);

    this.calendarForm = this.fb.group({
      myDate: [null, Validators.required],
      myTime: [null, Validators.required],
      personId: ['']

    });
  }

  pickDate(event: IMyDateModel) {
    console.log(event.date);
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
    this.markAsTouched(this.calendarForm);
    console.log(this.calendarForm.valid);
    console.log(this.calendarForm.value);
      if (!this.calendarForm.valid) {
        this.toastr.warning('Prosze wypełnić wszystkie wymagane pola');
      } else {
        this.toastr.success('Wybrano date wizyty oraz godzine.');
        this.calendarList = this.firebase.list('calendars');
        const newPostRef = this.calendarList.push(this.calendarForm.value);
        const postId = newPostRef.key;
        this.router.navigate([`/registration/summary`, {id: postId}]);
      }
  }
}
