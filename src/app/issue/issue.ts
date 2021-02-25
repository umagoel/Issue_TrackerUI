import { environment } from './../../environments/environment.prod';
import { IssueType } from './../IssueType';
import { IssueStatus } from './../IssueStatus';
import { User } from 'src/app/User';
import { ProjectDashboardComponent } from './../project/project-dashboard/project-dashboard.component';
import { Project } from '../Project';
export class Issue {
  public issueId: number
  public key: string;
  public title: string;
  public assignee: User;
  public issueStatus:  IssueStatus;
  public project: Project;
  public desc: string;
  public issueType : IssueType;
  public priority: string;
  public fixVersion: string;
  public environment: string;
  public watchers: Array<User>;
  public dueDate: Date

  constructor(obj?:Issue){
    this.issueId = obj&& obj.issueId?obj.issueId:0;
  }


}
