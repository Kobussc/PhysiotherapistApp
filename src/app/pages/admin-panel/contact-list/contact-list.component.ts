import { ToastrService } from 'ngx-toastr';
import { ContactService } from './../../contact/contact.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from '../../contact/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ContactService]
})
export class ContactListComponent implements OnInit {

  contactList: Contact[];

  constructor(
    private contactService: ContactService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const x = this.contactService.getData();
    x.snapshotChanges().subscribe(item => {
      this.contactList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.contactList.push(y as Contact);
      });
    });
  }

  onDelete(key: string) {
    if (confirm('Czy na pewno usunąć tą wiadomość?') === true) {
      this.contactService.deleteContact(key);
      this.toastr.warning('Usunieto wiadomość', 'Rejest wiadomości');
    }
  }

}
