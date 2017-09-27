import { CompanyService } from './../company.service';
import { Component, OnInit } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  comp$: FirebaseObjectObservable<any>;

  constructor(private services: CompanyService) {
    this.comp$ = this.services.comp$;
  }

  ngOnInit() {
  }

  saveCompany(company) {
    this.services.saveComp(company);
  }

  updateCompany(company) {
    this.services.updateComp(company);
  }

  removeCompany() {
    this.services.removeComp();
  }

}

