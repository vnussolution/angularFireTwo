import { ICompany } from './../../interfaces';
import { Observable } from 'rxjs/Observable';
import { CompanyService } from './../company.service';
import { Component, OnInit } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2/database';

import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/observable/of';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  isNewCompany: boolean;
  compKey: string;

  comp$: FirebaseObjectObservable<ICompany>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private services: CompanyService) {

    this.compKey = this.activatedRoute.snapshot.params['id'];
    this.isNewCompany = this.compKey === 'new';
    if (!this.isNewCompany)
      this.getCompany();
    else
      // initialize an empty observable object
      this.comp$ = Observable.of({}) as FirebaseObjectObservable<ICompany>;
  }

  ngOnInit() {
  }

  getCompany() {
    this.comp$ = <FirebaseObjectObservable<ICompany>>this.services.getComp(this.compKey);
  }

  saveCompany(company) {
    const save = this.isNewCompany ? this.services.saveCompList(company) : this.services.updateCompList(company);
    save.then(_ => this.router.navigate(['company-list']));
  }

  updateCompany(company) {
    this.services.updateCompObj(company);
  }

  removeCompanyList(company) {
    this.services.removeCompList(company)
      .then(_ => this.router.navigate(['company-list']));
  }

}

