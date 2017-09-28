import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { ICompany } from '../../interfaces';


@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})

export class CompanyListComponent implements OnInit {


  companyList$: FirebaseListObservable<ICompany[]>
  constructor(private services: CompanyService) { }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.companyList$ = this.services.getComps();
    console.log(' list: ', this.companyList$);

  }

}
