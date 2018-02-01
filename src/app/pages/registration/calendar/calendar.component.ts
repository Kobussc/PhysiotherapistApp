import { IMyDpOptions, IMyDateModel, IMyInputFieldChanged } from 'mydatepicker';
import { FormGroup, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IMyLocales } from 'mydatepicker/dist/interfaces';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public MyDatePickerOptions: IMyDpOptions = {
    firstDayOfWeek: 'mo',
    disableWeekends: true,
    inline: true,
    dateFormat: 'dd.mm.yyyy',
    allowDeselectDate: false
  };

  public calendarForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.calendarForm = this.formBuilder.group({
      myDate: [null, Validators.required],
      time: [null, Validators.required]

    });
  }

  pickDate(event: IMyDateModel) {
    console.log(event.date);
  }

  pickTime() {
    console.log('asdf');
    }

  // setDate(): void {
  //   const date = new Date();
  //   this.calendarForm.patchValue({myDate: {
  //     date: {
  //       year: date.getFullYear(),
  //       month: date.getMonth() + 1,
  //       day: date.getDate()}
  //     }});
  // }
  // clearDate(): void {
  //   this.calendarForm.patchValue({myDate: null});
  // }
}
