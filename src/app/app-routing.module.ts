import { LoginGuard } from './login.guard';
import { ProjectModule } from './project/project.module';
import { IssueModule } from './issue/issue.module';
// import { AddIssueComponent } from './issue/add-issue/add-issue.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';


const routes: Routes = [
  {path: '' , redirectTo : '/login' , pathMatch: 'full'},
  {path: 'registration' , component: SignUpComponent},
  {path: 'login' , component: LoginComponent},
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'add-issue',
    loadChildren: () => import('./issue/issue.module').then(m => m.IssueModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'project',
    loadChildren: () => import('./project/project.module').then(m=>m.ProjectModule),
    canActivate: [LoginGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuard]
})
export class AppRoutingModule { }
