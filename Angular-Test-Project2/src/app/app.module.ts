import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MediatorsComponent } from './mediators/mediators.component';
import { MediatorComponent } from './mediator/mediator.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import '@angular/common/locales/bg';
import { ObjectdispComponent } from './objectdisp/objectdisp.component';
import { CategoryComponent } from './category/category.component';
import { CategorymanagerComponent } from './categorymanager/categorymanager.component';
import { MainComponent } from './main/main.component';
import { UserComponent } from './user/user.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { UserobjectmanagementComponent } from './userobjectmanagement/userobjectmanagement.component';
import { UsereventsmanagementComponent } from './usereventsmanagement/usereventsmanagement.component';
import { UsermenupanelComponent } from './usermenupanel/usermenupanel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MediatorsComponent,
    MediatorComponent,
    ObjectdispComponent,
    CategoryComponent,
    CategorymanagerComponent,
    MainComponent,
    UserComponent,
    UserprofileComponent,
    UsermanagementComponent,
    UserobjectmanagementComponent,
    UsereventsmanagementComponent,
    UsermenupanelComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
