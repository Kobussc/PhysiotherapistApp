import { IMyDpOptions, IMyDateModel, IMyInputFieldChanged } from 'mydatepicker';
import { FormGroup, FormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  calendarForm: FormGroup;
  private calendarId: string;

  public MyDatePickerOptions: IMyDpOptions = {
    firstDayOfWeek: 'mo',
    disableWeekends: true,
    inline: true,
    dateFormat: 'dd.mm.yyyy',
    allowDeselectDate: false
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private calendarService: CalendarService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.calendarForm = this.fb.group({
      myDate: [null, Validators.required],
      myTime: [null, Validators.required]

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

  save() {
    this.markAsTouched(this.calendarForm);
    console.log(this.calendarForm.valid);
    console.log(this.calendarForm.value);
      if (!this.calendarForm.valid) {
        this.toastr.warning('Prosze wypełnić wszystkie wymagane pola');
      } else {
        this.toastr.success('Wybrano date wizyty oraz godzine.');
        this.calendarService.insertDay(this.calendarForm.value);
        this.router.navigate([`/registration/summary`]);
      }
  }
}
