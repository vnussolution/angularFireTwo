import { AuthGuard } from './../auth/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from '../company/company-list/company-list.component';
import { CompanyEditComponent } from '../company/company-edit/company-edit.component';
import { ContactListComponent } from '../contact/contact-list/contact-list.component';
import { ContactEditComponent } from '../contact/contact-edit/contact-edit.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'company-list', component: CompanyListComponent, canActivate: [AuthGuard] },
  { path: 'company-edit/:id', component: CompanyEditComponent, canActivate: [AuthGuard] },
  { path: 'contact-list', component: ContactListComponent, canActivate: [AuthGuard] },
  { path: 'contact-edit/:id', component: ContactEditComponent, canActivate: [AuthGuard] }

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }