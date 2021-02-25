import { IssueService } from './../issue/issue.service';
import { Component, OnInit } from '@angular/core';
import { format, parse, parseISO } from 'date-fns';
import { Issue } from '../issue/issue';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public issueList: Array<Issue> =[];
  public sidebarWidth: string;
  public mainWidth: string;
  public columns=[
    {
      name: 'Type',
      prop: 'issueType.name'
    },
    {
      name: 'Key',
      prop: 'key'
    },
    {
      name: 'Summary',
      prop: 'desc'
    },
    {
      name: 'Priority',
      prop: 'priority'
    },
    {
      name: 'Due Date',
      prop: 'dueDate',
      pipe: { transform: value => format(parseISO(value), 'dd-MMM-yyyy') }
    },
    {
      name: 'Fix Version/s',
      prop: 'fixVersion'
    }
  ]

  constructor(private issueService : IssueService) { }

  ngOnInit(): void {
    this.issueService.getAll().subscribe((data)=>{
      this.issueList = data?data:[];

      console.log(data);

    })
  }
  onCreateIsuue(){

  }

  openNav(){
    this.mainWidth='250px';
    this.sidebarWidth='250px';

  }

  closeNav(){
    this.sidebarWidth='0px';
    this.mainWidth='0px';
  }
}
