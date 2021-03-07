import { AppStore } from './app.store';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jira';
  rows: []
  constructor(public store: AppStore){}

  ngOnInit(){

  }
}
