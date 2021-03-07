import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-project-category',
  templateUrl: './project-category.component.html',
  styleUrls: ['./project-category.component.scss']
})
export class ProjectCategoryComponent implements OnInit {
  public columns: Array<TableColumn>=[];
  public projectCategory: Array<any>=[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.columns = [
      {
        name: 'Name',
        prop: 'name',
      }
    ];
    this.http.get<Array<any>>("api/project/category/all").subscribe(data=>{
      this.projectCategory =data;
    })

  }

  addCategory(){

  }

}
