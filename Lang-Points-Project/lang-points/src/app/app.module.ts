import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { NounComponent } from './nouns/noun/noun.component';
import { NounsComponent } from './nouns/nouns.component';
import { ExamplesComponent } from './examples/examples.component';
import { ExampleComponent } from './examples/example/example.component';
import { ExamplesFormComponent } from './forms/examples-form/examples-form.component';
import { TranslationsFormComponent } from './forms/translations-form/translations-form.component';
import { TextFormComponent } from './forms/text-form/text-form.component';
import { NounFormComponent } from './forms/noun-form/noun-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    NounComponent,
    NounsComponent,
    ExamplesComponent,
    ExampleComponent,
    ExamplesFormComponent,
    TranslationsFormComponent,
    TextFormComponent,
    NounFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
