import { Category } from './../../Category';
import { ProjectModule } from './../project.module';
import { Project } from '../../Project';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProjectStore } from '../project.store';
import { User } from 'src/app/User';
import { IssueStatus } from 'src/app/IssueStatus';
import { IssueType } from 'src/app/IssueType';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.scss']
})
export class AddEditProjectComponent implements OnInit {

  users: Array<User>=[];
  categories: Array<Category>= [];
  project: Project=new Project();
  statuses: Array<IssueStatus>= [];
  issueTypes: Array<IssueType>=[];
  projectTypes: Array<any>

  constructor(private http: HttpClient, private router: Router, private store: ProjectStore) { }

  ngOnInit(): void {
    this.projectTypes=[
      {
        label: 'BUSINESS'
      },
      {
        label:'SOFTWARE'
      }
    ]
    if(this.store.selectedProject){
      this.project = this.store.selectedProject;

    }
    this.http.get<Array<User>>('/api/users/all').subscribe(data=>{
      this.users = data;
      console.log(data)
    })

    this.http.get<Array<IssueType>>('/api/issue/issue-type/all').subscribe(data=>{
      this.issueTypes = data;
      console.log(data)

    })
    this.http.get<Array<IssueStatus>>('/api/issue/issue-status/all').subscribe(data=>{
      this.statuses = data;
      console.log(data)
    })

    this.http.get<Array<Category>>('/api/project/category/all').subscribe(data=>{
      this.categories = data;
      console.log(data)
    })

  }
  save(){
    this.http.post<Project>('/api/project/save',this.project).subscribe((data)=>{
      this.router.navigate(["project"]);
    });
  }
  cancel(){
    this.router.navigate(["project"]);
  }
}
