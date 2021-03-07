import { AddIssueTypeComponent } from './add-issue-type/add-issue-type.component';
import { Component, OnInit } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-issue-type',
  templateUrl: './issue-type.component.html',
  styleUrls: ['./issue-type.component.scss']
})
export class IssueTypeComponent implements OnInit {

  public columns: Array<TableColumn>= [];
  public issueTypeList:Array<any>=[];
  private modalRef: NgbModalRef
  public readonly DEFAULT_MODAL_OPTIONS: NgbModalOptions = {
    backdrop: 'static',
    size: 'lg',
    scrollable: false
};

  constructor(private _modalService: NgbModal,private http: HttpClient) { }

  ngOnInit(): void {
    this.columns = [
      {
        name: 'Name',
        prop: 'name',
      }
    ];
    this.http.get<Array<any>>('/api/issue/issue-type/all').subscribe(data=>{
      this.issueTypeList = data;
    })
  }

  addIssueType(){
   this.modalRef =  this._modalService.open(AddIssueTypeComponent, this.DEFAULT_MODAL_OPTIONS)
  }
  ngOnDestroy(){
    if(this.modalRef){
      this.modalRef.close();
    }
  }
}
