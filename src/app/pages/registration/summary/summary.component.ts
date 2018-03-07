import { Component, OnInit } from '@angular/core';
import { PersonService } from '../personal/person.service';
import { Person } from '../personal/person.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  providers: [PersonService]
})
export class SummaryComponent implements OnInit {

  personId: string;
  personList: Person[];

  constructor(
    private personService: PersonService
  ) { }

  ngOnInit() {
    const id = window.location.href;
    this.personId = id.slice(46, 70);

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
