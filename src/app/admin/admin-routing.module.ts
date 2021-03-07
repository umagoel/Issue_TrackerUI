import { UsersComponent } from './users/users.component';
import { ProjectCategoryComponent } from './project-category/project-category.component';
import { IssueStatusComponent } from './issue-status/issue-status.component';
import { IssueTypeComponent } from './issue-type/issue-type.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '', component: AdminComponent,children:[
    {
      path: 'issue-type',
      component: IssueTypeComponent
    },{
      path: 'issue-status',
      component: IssueStatusComponent
    },{
      path: 'project-category',
      component: ProjectCategoryComponent
    },{
      path: 'users',
      component: UsersComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
