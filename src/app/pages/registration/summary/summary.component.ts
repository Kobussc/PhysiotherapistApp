import { Component, OnInit } from '@angular/core';
import { PersonService } from '../personal/persons/shared/person.service';
import { Person } from '../personal/persons/shared/person.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  providers: [PersonService]
})
export class SummaryComponent implements OnInit {

  personList: Person[];
  constructor(
    private personService: PersonService
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
  }

}
