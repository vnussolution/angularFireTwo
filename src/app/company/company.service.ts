import { ICompany } from './../interfaces';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';


@Injectable()
export class CompanyService {

  comp$: FirebaseObjectObservable<ICompany>;
  comps$: FirebaseListObservable<ICompany[]>;


  constructor(private db: AngularFireDatabase) {
    this.comp$ = this.db.object(`company`);
    this.comps$ = this.db.list('companies');
  }

  getComp(compKey: string) {
    return this.db.object(`companies/${compKey}`).catch(this.errorHandler);
  }

  getComps() {
    return this.comps$.catch(this.errorHandler);

  }

  saveCompList(company: ICompany) {
    return this.comps$.push(company)
      .then(_ => console.log('success saveCompList'))
      .catch(e => console.log('error saveCompList', e));
  }

  updateCompList(company: ICompany) {
    return this.comps$.update(company.$key, company)
      .then(_ => console.log('success updateCompList'))
      .catch(e => console.log('error updateCompList', e));
  }

  removeCompList(company: ICompany) {
    return this.comps$.remove(company.$key)
      .then(_ => console.log('success removeCompList'))
      .catch(e => console.log('error removeCompList', e));
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

  private errorHandler(error) {
    console.log('error: ', error);
    return Observable.throw(error);
  }
}




