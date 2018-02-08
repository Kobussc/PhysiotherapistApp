import { IMyDpOptions, IMyDateModel, IMyInputFieldChanged } from 'mydatepicker';
import { FormGroup, FormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMyLocales } from 'mydatepicker/dist/interfaces';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.calendarForm = this.formBuilder.group({
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
        this.router.navigate([`/registration/summary`]);
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
