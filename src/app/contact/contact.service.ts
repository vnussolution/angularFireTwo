import { IContact } from './../interfaces';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class ContactService {
  // initial value is undefined, the input value is string type
  subject$ = new BehaviorSubject<string>(undefined);

  contact$: FirebaseObjectObservable<IContact>;
  contacts$: FirebaseListObservable<IContact[]>;


  constructor(private db: AngularFireDatabase) {
    this.contact$ = this.db.object(`contact`);
    this.contacts$ = this.db.list('contacts');
  }

  getContact(compKey: string) {
    return this.db.object(`contacts/${compKey}`).catch(this.errorHandler);
  }

  // if companyKey is undefined, it will return all
  getContacts() {
    return this.db.list('contacts', {
      query: {
        orderByChild: 'name',
        equalTo: this.subject$
      }
    });
  }


  saveContactList(contact: IContact) {
    return this.contacts$.push(contact)
      .then(_ => console.log('success saveContactList'))
      .catch(e => console.log('error saveContactList', e));
  }

  updateContactList(contact: IContact) {
    const updateContact = {};
    updateContact[`contacts/${contact.$key}`] = contact;
    Object.keys(contact.contactCompanies).forEach(key => {
      updateContact[`companyContacts/${key}/${contact.$key}`] = true;
    });
    return this.db.object('/').update(updateContact)
      // return this.contacts$.update(contact.$key, contact)
      .then(_ => console.log('success updateContactList'))
      .catch(e => console.log('error updateContactList', e));
  }

  removeContactList(contact: IContact) {
    const removeContact = {};

    removeContact[`contacts/${contact.$key}`] = null;

    Object.keys(contact.contactCompanies).forEach(key => {
      removeContact[`companyContacts/${key}/${contact.$key}`] = null;
    });



    return this.db.object('/').update(removeContact)

      // return this.contacts$.remove(contact.$key)
      .then(_ => console.log('success removeContactList'))
      .catch(e => console.log('error removeContactList', e));
  }

  private errorHandler(error) {
    console.log('error: ', error);
    return Observable.throw(error);
  }
}



