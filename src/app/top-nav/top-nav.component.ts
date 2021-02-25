import { get } from 'lodash';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit(): void {
  }

  addIssue(): void{
    this.router.navigate(['add-issue']);

  }

  logout(): void{
    this.accountService.logout();
  }

}
