import { CompanyService } from './../../company/company.service';
import { IContact, ICompany } from './../../interfaces';
import { Observable } from 'rxjs/Observable';
import { ContactService } from './../contact.service';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, NgZone, AfterViewInit } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2/database';

import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/observable/of';

import * as firebase from 'firebase/app'; // typings only


@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  isNewContact: boolean;
  contactKey: string;
  companies$: Observable<ICompany[]>;
  contact = { name: '' } as IContact;
  contactCompanies = [];
  selectedCompany: ICompany;


  constructor(private companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private contactService: ContactService) {

  }


  ngOnInit() {
    this.companies$ = this.companyService.getComps();
    this.contactKey = this.activatedRoute.snapshot.params['id'];
    this.isNewContact = this.contactKey === 'new';
    if (!this.isNewContact)
      this.getContact();
  }



  getContact() {
    this.contactService.getContact(this.contactKey).subscribe(contact => {
      this.contact = contact;
      this.setContactCompanies();
    });
  }

  uploadFile(event: any) {
    const file = event.srcElement.files[0];
    const storageRef = firebase.storage().ref(`contacts/${this.contactKey}`);
    storageRef.put(file).then(uploadTask => this.contact.imageUrl = uploadTask.downloadURL);
  }

  addCompany() {
    this.contact.contactCompanies[this.selectedCompany.$key] = { name: this.selectedCompany.name };
    this.setContactCompanies();
  }

  setContactCompanies() {
    console.log('222', this.contact.contactCompanies);

    if (this.contact.contactCompanies == null) {
      this.contact.contactCompanies = {};
    }
    console.log('111', this.contact);
    this.contactCompanies = Object.keys(this.contact.contactCompanies)
      .map(key => {
        console.log('setcontactcompanies: ', key);
        return this.contact.contactCompanies[key];
      });

  }

  saveContact(contact) {
    console.log('333', this.contact);
    const save = this.isNewContact ? this.contactService.saveContactList(contact) : this.contactService.updateContactList(contact);
    save.then(_ => this.router.navigate(['contact-list']));
  }

  removeContactList(contact) {
    this.contactService.removeContactList(contact)
      .then(_ => this.router.navigate(['contact-list']));
  }

}