import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { MediatorsComponent } from './mediators/mediators.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {path: 'main', 
   component: MainComponent,
   children: [
    {path: 'home', component: HomeComponent, outlet: 'mnavig'},
    {path: 'category/:type', component: CategoryComponent, outlet: 'mnavig'},
   ]
  },
  {path: 'user', component: UserComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
