import { IssueType } from './IssueType';
import { Category } from './Category';
import { User } from './User';
import { IssueStatus } from './IssueStatus';
export class Project{

      public projectName: string;
      public projectType: string;
      public projectLead: User=new User();
      public projectCategory: Category;
      public issueStatusList: Array<IssueStatus>;
      public issueTypes: Array<IssueType>;
      public url: string;
      constructor(
  ){ }

}
