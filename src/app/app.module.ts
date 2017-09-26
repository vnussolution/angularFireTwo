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
import { MdButtonModule, Md, MdCheckboxModule } from '@angular/material';


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBHCGoAiRcNYOFzu-oaj3lC8vNRLgI7tM0",
  authDomain: "angularfiretwo-d5b3a.firebaseapp.com",
  databaseURL: "https://angularfiretwo-d5b3a.firebaseio.com",
  projectId: "angularfiretwo-d5b3a",
  storageBucket: "",
  messagingSenderId: "700073074468"
};

////////////////setup material  ////////////////////////////
@NgModule({
  imports: [MdButtonModule, MdCheckboxModule],
  exports: [MdButtonModule, MdCheckboxModule],
})
export class MyOwnCustomMaterialModule { }


/////////////////////
@NgModule({
  declarations: [
    AppComponent
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
    MyOwnCustomMaterialModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



