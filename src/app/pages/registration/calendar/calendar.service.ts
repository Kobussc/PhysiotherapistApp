import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Calendar } from './calendar.model';
import * as functions from '../../../../../functions/node_modules/firebase-functions';

@Injectable()
export class CalendarService {

  calendarList: AngularFireList<any>;
  selectedDay: Calendar = new Calendar();

  constructor(private firebase: AngularFireDatabase) { }

  getData() {
    this.calendarList = this.firebase.list('calendars');
    return this.calendarList;
  }

  insertDay(calendar: Calendar) {
    this.calendarList = this.firebase.list('calendars');
    this.calendarList.push({
      myDate: calendar.myDate,
      myTime: calendar.myTime
    });
  }

  updateDay(calendar: Calendar) {
    this.calendarList.update(calendar.$key,
    {
      myDate: calendar.myDate,
      myTime: calendar.myTime
    });
  }

  deleteDay($key: string) {
    this.calendarList.remove($key);
  }

}
