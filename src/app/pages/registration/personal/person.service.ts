import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Person } from './person.model';
import 'rxjs/add/operator/map';

@Injectable()
export class PersonService {

  personList: AngularFireList<any>;
  selectedPerson: Person = new Person();

  constructor(private firebase: AngularFireDatabase) { }

  getData() {
    this.personList = this.firebase.list('persons');
    return this.personList;
  }

  insertPerson(person: Person) {
    this.personList = this.firebase.list('persons');
    const newPostRef = this.personList.push({
      dateOfBirth: person.dateOfBirth,
      email: person.email,
      name: person.name,
      pesel: person.pesel,
      phone: person.phone,
      surname: person.surname
    });
    const postId = newPostRef.key;
    console.log(postId);
    }

  updatePerson(person: Person) {
    this.personList.update(person.$key,
      {
        dateOfBirth: person.dateOfBirth,
        email: person.email,
        name: person.name,
        pesel: person.pesel,
        phone: person.phone,
        surname: person.surname
      }
    );
  }

  deletePerson($key: string) {
    this.personList.remove($key);
  }

}
