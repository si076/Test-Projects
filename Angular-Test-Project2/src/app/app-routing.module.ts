import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { MediatorsComponent } from './mediators/mediators.component';
import { UserComponent } from './user/user.component';
import { UsereventsmanagementComponent } from './usereventsmanagement/usereventsmanagement.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { UserobjectmanagementComponent } from './userobjectmanagement/userobjectmanagement.component';
import { UserprofileComponent } from './userprofile/userprofile.component';


const routes: Routes = [
  {path: 'main', component: MainComponent,
    children: [
      {path: 'home', component: HomeComponent, outlet: 'mnavig'},
      {path: 'category/:type', component: CategoryComponent, outlet: 'mnavig'},
    ]
  },
  {path: 'user', component: UserComponent,
    children: [
      {path: 'userprofile', component: UserprofileComponent, outlet: 'user_action'},
      {path: 'usereventsman', component:UsereventsmanagementComponent, outlet: 'user_action'},
      {path: 'userobjman', component: UserobjectmanagementComponent, outlet: 'user_action'},
      {path: 'userman', component: UsermanagementComponent, outlet: 'user_action'}
    ]},
  {path: '', redirectTo: '/main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
