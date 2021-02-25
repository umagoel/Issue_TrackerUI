import { IssueType } from './../../IssueType';
import { IssueStatus } from './../../IssueStatus';
import { User } from 'src/app/User';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/Project';
import { Issue } from '../issue';

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.scss']
})
export class AddIssueComponent implements OnInit {
  issue: Issue = new Issue();
  projects: Array<Project>=[];
  users: Array<User>=[];
  reporters: Array<User>=[];
  types: Array<IssueType>=[];
  priorities: Array<any>;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.priorities=[
      {
        label: 'LOW'
      },
      {
        label:'MEDIUM'
      },
      {
        label:'HIGH'
      }
    ]
    console.log(localStorage.getItem('user'));


    this.http.get<Array<Project>>('/api/project/all').subscribe(data=>{
      this.projects = data;
      // console.log(data);

    })

    this.http.get<Array<User>>('/api/users/all').subscribe(data=>{
      this.users = data;
      console.log(this.users);

    })

    this.http.get<Array<IssueType>>('/api/issue/issue-type/all').subscribe(data=>{
      this.types = data;
      // console.log(data)
    })

  }

  save() : void{
    this.http.post('/api/issue' , this.issue).subscribe(()=>
      this.router.navigate(["dashboard"])
    )
  }

  cancel(): void{
    this.router.navigate(['dashboard']);
  }

}
