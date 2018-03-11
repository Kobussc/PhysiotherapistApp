import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Note {
  content: string;
  hearts: number;
  id?: string;
}

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {

  notesCollection: AngularFirestoreCollection<Note>;
  notes: Observable<Note[]>;

  title = 'app';

  constructor (private afs: AngularFirestore) {}

  ngOnInit() {
    this.notesCollection = this.afs.collection('notes');
    this.notes = this.notesCollection.valueChanges();

  }


}
