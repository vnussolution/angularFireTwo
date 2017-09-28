import { ICompany } from './../interfaces';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/from';


@Injectable()
export class CompanyService {

  comp$: FirebaseObjectObservable<ICompany>;
  comps$: FirebaseListObservable<ICompany[]>;


  constructor(private db: AngularFireDatabase) {
    this.comp$ = this.db.object(`company`);
    this.comps$ = this.db.list('companies');
  }

  getComp(compKey: string) {
    return this.db.object(`companies/${compKey}`);
  }

  getComps() {
    return this.comps$;
  }

  saveCompList(company: ICompany) {
    this.comps$.push(company)
      .then(_ => console.log('success saveCompList'))
      .catch(e => console.log('error saveCompList', e));
  }

  updateCompList(company: ICompany) {
    this.comps$.update(company.$key, company)
      .then(_ => console.log('success updateCompList'))
      .catch(e => console.log('error updateCompList', e));
  }

  saveCompObj(company: ICompany) {

    // observable version
    // Observable.from(this.comp$.set({ name: company.name }).catch(e => Observable.throw(e)));

    // promise version
    this.comp$.set({ name: company.name })
      .then(_ => console.log('success'))
      .catch(e => console.log('error', e));
  }



  updateCompObj(company) {
    // promise version
    this.comp$.update({ phone: company.phone || '9999' })
      .then(_ => console.log('success'))
      .catch(e => console.log('error', e));
  }
  removeCompObj() {
    // promise version
    this.comp$.remove()
      .then(_ => console.log('success'))
      .catch(e => console.log('error', e));
  }
}



