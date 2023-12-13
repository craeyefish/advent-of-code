import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Q1Component } from './q1/q1.component';
import { Q2Component } from './q2/q2.component';
import { Q3Component } from './q3/q3.component';
import { Q4Component } from './q4/q4.component';
import { Q5Component } from './q5/q5.component';
import { Q6Component } from './q6/q6.component';
import { Q7Component } from './q7/q7.component';
import { Q8Component } from './q8/q8.component';
import { Q9Component } from './q9/q9.component';
import { Q10Component } from './q10/q10.component';
import { Q11Component } from './q11/q11.component';
import { Q12Component } from './q12/q12.component';
import { Q13Component } from './q13/q13.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, Q1Component, Q2Component, Q3Component, Q4Component, Q5Component, Q6Component, Q7Component, Q8Component, Q9Component, Q10Component, Q11Component, Q12Component, Q13Component],
  imports: [
    BrowserModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
