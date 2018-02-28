import { ToastrService } from 'ngx-toastr';
import { Calendar } from './../../registration/calendar/calendar.model';
import { CalendarService } from './../../registration/calendar/calendar.service';
import { Person } from './../../registration/personal/person.model';
import { PersonService } from './../../registration/personal/person.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.css'],
  providers: [PersonService, CalendarService]
})
export class VisitListComponent implements OnInit {

  personId: string;
  personList: Person[];
  calendarList: Calendar[];

  constructor(
    private calendarService: CalendarService,
    private personService: PersonService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    const today = new Date();
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
      let personID = '';
      item.forEach(element => {
        const b = element.payload.toJSON();
        b['$key'] = element.key;
        this.calendarList.push(b as Calendar);
        Object.getOwnPropertyNames(b).forEach(
          function (val, idx, arra) {
            if (val === 'personId') {
              personID = b[val];
              b['personID'] = personID;
            }
            if (val === 'myDate') {
              const date = b[val];
            }
          }
        );
      });
    });
  }

  onDelete(key: string, key1: string) {
    const personID = '';
    const calendarService = this.calendarService;
    const toastr = this.toastr;
    const personService = this.personService;
    if (confirm('Czy na pewno usunąć tą rezerwacje?') === true) {
      calendarService.deleteDay(key);
      personService.deletePerson(key1);
      toastr.warning('Usunieto wizyte', 'Rejestr rezerwacji');
    }
  }

}
