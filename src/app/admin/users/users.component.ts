import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TableColumn } from '@swimlane/ngx-datatable';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public columns: Array<TableColumn>= [];
  public userList: Array<User>=[];

  constructor(private http: HttpClient , private router: Router) { }

  ngOnInit(): void {
    this.columns = [
      {
        name: 'Name',
        prop: 'fullName',
      },
      {
        name: 'Email',
        prop: 'emailId',
      }
    ];
    this.http.get<Array<User>>("api/users/list").subscribe(data=>{
      this.userList = data;
    })

  }

  addUser(){
    this.router.navigate(["registration"])
  }
}
