import { Observable } from 'rxjs/Observable';
import { ICompany } from './../../interfaces';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, NgZone, AfterViewInit } from '@angular/core';

import { ContactService } from '../contact.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { IContact } from '../../interfaces';
import { CompanyService } from '../../company/company.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit, AfterViewInit {
  companies$: Observable<ICompany[]>;
  contactList$: FirebaseListObservable<IContact[]>;
  searchContact;


  @ViewChild('inputContact') inputElRef: ElementRef;

  constructor(private companyService: CompanyService, public contactService: ContactService,
    private ngzone: NgZone, private cdref: ChangeDetectorRef) { }



  ngAfterViewInit() {
    this.ngzone.runOutsideAngular(() => {
      Observable.fromEvent(this.inputElRef.nativeElement, 'keyup')
        .debounceTime(500)
        .subscribe((keyboardEvent: KeyboardEvent) => {
          this.searchContact = (<HTMLInputElement>keyboardEvent.target).value;
          this.contactService.subject$.next(this.searchContact);
          this.cdref.detectChanges();
        });
      Observable.fromEvent(window, 'resize')
        .throttleTime(200)
        .subscribe(e => {
          console.log('resize event', e);
          this.searchContact += '*';  // change something to show it worked
          this.cdref.detectChanges();
        });
    });
  }

  ngOnInit() {
    this.getContacts();
    this.companies$ = this.companyService.getComps();
  }

  getContacts() {
    this.contactList$ = <FirebaseListObservable<IContact[]>>this.contactService.getContacts();
    console.log(' list: ', this.contactList$.subscribe(list => console.log('55555: ', list)));
  }



}


