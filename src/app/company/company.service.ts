import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/from';


@Injectable()
export class CompanyService {

  comp$: FirebaseObjectObservable<any>;


  constructor(private db: AngularFireDatabase) {
    this.comp$ = this.db.object(`company`);
  }

  saveComp(company) {

    //observable version
    //Observable.from(this.comp$.set({ name: company.name }).catch(e => Observable.throw(e)));

    // promise version
    this.comp$.set({ name: company.name })
      .then(_ => console.log('success'))
      .catch(e => console.log('error', e));
  }

  updateComp(company) {
    //promise version
    this.comp$.update({ phone: company.phone || '9999' })
      .then(_ => console.log('success'))
      .catch(e => console.log('error', e));
  }
  removeComp() {
    //promise version
    this.comp$.remove()
      .then(_ => console.log('success'))
      .catch(e => console.log('error', e));
  }
}



