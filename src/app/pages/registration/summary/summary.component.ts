import { CalendarService } from './../calendar/calendar.service';
import { Component, OnInit } from '@angular/core';
import { PersonService } from '../personal/person.service';
import { Person } from '../personal/person.model';
import { Calendar } from '../calendar/calendar.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  providers: [PersonService, CalendarService]
})
export class SummaryComponent implements OnInit {

  personList: Person[];
  calendarList: Calendar[];
  constructor(
    private personService: PersonService,
    private calendarService: CalendarService
  ) { }

  ngOnInit() {
    const x = this.personService.getData();
    x.snapshotChanges().subscribe(item => {
      this.personList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.personList.push(y as Person);
      });
    });

    const z = this.calendarService.getData();
    z.snapshotChanges().subscribe(item => {
      this.calendarList = [];
      item.forEach(element => {
        const u = element.payload.toJSON();
        u['$key'] = element.key;
      this.calendarList.push(u as Calendar);
      });
    });
  }

}
