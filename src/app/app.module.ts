import { AppRoutingModule } from './app-routing/app-routing.module';
import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { FlexLayoutModule } from '@angular/flex-layout'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyService } from './company/company.service';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './shared/Material.module';


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBHCGoAiRcNYOFzu-oaj3lC8vNRLgI7tM0",
  authDomain: "angularfiretwo-d5b3a.firebaseapp.com",
  databaseURL: "https://angularfiretwo-d5b3a.firebaseio.com",
  projectId: "angularfiretwo-d5b3a",
  storageBucket: "",
  messagingSenderId: "700073074468"
};


@NgModule({
  declarations: [
    AppComponent,
    CompanyEditComponent,
    CompanyListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    AppRoutingModule,
    RouterModule

  ],
  providers: [CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }



