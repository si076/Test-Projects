import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { NounsComponent } from './nouns/nouns.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'main', component: MainComponent,
    children: [
      {path: 'nouns', component: NounsComponent, outlet: 'main_cont'}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
