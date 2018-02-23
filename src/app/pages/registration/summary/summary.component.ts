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

  personId: string;
  calendarId: string;
  personList: Person[];
  calendarList: Calendar[];
  constructor(
    private personService: PersonService,
    private calendarService: CalendarService
  ) { }

  ngOnInit() {
    const id = window.location.href;
    this.calendarId = id.slice(46, 70);

    const z = this.calendarService.getData();
    z.snapshotChanges().subscribe(item => {
      this.calendarList = [];
      item.forEach(element => {
        let pID = 'asd';
        const u = element.payload.toJSON();
        if (element.key === this.calendarId) {
          this.calendarList.push(u as Calendar);
          Object.getOwnPropertyNames(u).forEach(
            function(val, idx, arra) {
              if (val === 'personId') {
                const idString = u[val];
                pID = idString;
              }
            }
          );
          this.personId = pID;
        }
      });
    });

    const x = this.personService.getData();
    x.snapshotChanges().subscribe(item => {
      this.personList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        if (element.key === this.personId) {
          this.personList.push(y as Person);
        }
      });
    });
  }
}
