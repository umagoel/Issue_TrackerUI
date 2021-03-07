import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIssueTypeComponent } from './add-issue-type.component';

describe('AddIssueTypeComponent', () => {
  let component: AddIssueTypeComponent;
  let fixture: ComponentFixture<AddIssueTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIssueTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIssueTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
