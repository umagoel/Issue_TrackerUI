import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public sidebarWidth: string;
  public mainWidth: string;
  constructor(public router: Router) { }

  ngOnInit(): void {
  }


}
