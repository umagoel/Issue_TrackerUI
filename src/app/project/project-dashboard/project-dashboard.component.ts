import { TableColumn } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ProjectService } from './../project.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Project } from 'src/app/Project';
import { ProjectStore } from '../project.store';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {
  public projectList=[];
  @ViewChild('action', { static: true })
    public action: ElementRef;
    @ViewChild('projectName', { static: true })
    public projectName: ElementRef;

  public columns:Array<TableColumn>=[];
  constructor(private projectService: ProjectService, private route :Router, private projectStore: ProjectStore) { }

  ngOnInit(): void {
    this.columns = [
      {
        name: 'Name',
        prop: 'projectName',
        cellTemplate: this.projectName
      },
      {
        name: 'Type',
        prop: 'projectType'
      },
      {
        name: 'Lead',
        prop: 'projectLead.firstName'
      },
      {
        name: 'Category',
        prop: 'projectCategory.name'
      },
      {
        name: 'URL',
        prop: 'url'
      },
      {
        name: 'Edit',
        cellTemplate: this.action
      }
    ];
    this.projectService.getAll().subscribe((data)=>{
      this.projectList = data?data:[];
    })
  }
  addProject(){
    this.route.navigate(['project/add-project'])
  }

  editProject(val){
    this.projectStore.selectedProject = val;
    this.addProject();

  }

}
