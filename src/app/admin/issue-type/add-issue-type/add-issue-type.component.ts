import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-issue-type',
  templateUrl: './add-issue-type.component.html',
  styleUrls: ['./add-issue-type.component.scss']
})
export class AddIssueTypeComponent implements OnInit {

  public addIssueTypeForm: FormGroup

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder,
    private http: HttpClient) { }

  ngOnInit(): void {

    this.addIssueTypeForm = this.fb.group(
      {
        name: [null, Validators.required],

      }
    );
  }

  public onSubmit(): void{
    this.http.post('/api/issue/issue-type', this.addIssueTypeForm.value).subscribe(()=>{
      this.activeModal.close();
    })
  }

}
