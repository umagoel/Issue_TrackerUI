import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';


const routes: Routes = [
  {
    path:'' , component: ProjectDashboardComponent,
  },
  {
    path:'add-project' , component: AddEditProjectComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
