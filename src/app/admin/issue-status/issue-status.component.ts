import { HttpClient } from '@angular/common/http';
import { TableColumn } from '@swimlane/ngx-datatable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-issue-status',
  templateUrl: './issue-status.component.html',
  styleUrls: ['./issue-status.component.scss']
})
export class IssueStatusComponent implements OnInit {

  public columns: Array<TableColumn>= [];
  public issueStatusList:Array<any>=[]

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.columns = [
      {
        name: 'Name',
        prop: 'name',
      },
      {
        name: 'Level',
        prop: 'level'
      }
    ];
    this.http.get<Array<any>>('/api/issue/issue-status/all').subscribe(data=>{
      this.issueStatusList = data;
    })
  }

  addIssueStatus(): void{

  }

}
