import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Contact } from './contact.model';
import { ContactService } from './contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  selectedContact: Contact = new Contact();

  constructor(
    private contactService: ContactService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      surname: [''],
      email: ['', Validators.required],
      phone: [''],
      textArea: ['', Validators.required]
    });
  }

  markAsTouched(fg: AbstractControl) {
    if (fg instanceof FormGroup) {
      for (const key in fg.controls) {
        if (fg.controls.hasOwnProperty(key)) {
          this.markAsTouched(fg.controls[key]);
        }
      }
    } else {
      fg.markAsTouched();
    }
  }

  save() {
    this.markAsTouched(this.contactForm);
    if (!this.contactForm.valid) {
      this.toastr.warning('Prosze wypełnić wszystkie pola');
    } else {
      this.toastr.success('Pomyślnie dodano dane osobowe.');
      this.contactService.insertContact(this.contactForm.value);
      this.buildForm();
    }
  }

}
