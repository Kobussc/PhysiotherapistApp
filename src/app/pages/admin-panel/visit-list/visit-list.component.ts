import { ToastrService } from 'ngx-toastr';
import { Person } from './../../registration/personal/person.model';
import { PersonService } from './../../registration/personal/person.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.css'],
  providers: [PersonService]
})
export class VisitListComponent implements OnInit {

  personId: string;
  personList: Person[];

  constructor(
    private personService: PersonService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const x = this.personService.getData();
    x.snapshotChanges().subscribe(item => {
      this.personList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        // Object.getOwnPropertyNames(y).forEach(
        //   function (val, idx, arra) {
        //     if (val === 'myDate') {
        //     }
        //   }
        // );
        this.personList.push(y as Person);
      });
    });
  }

  onDelete(key: string) {
    if (confirm('Czy na pewno usunąć tą rezerwacje?') === true) {
      this.personService.deletePerson(key);
      this.toastr.warning('Usunieto wizyte', 'Rejestr rezerwacji');
    }
  }

}
