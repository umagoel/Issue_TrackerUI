import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jira';
  rows: []
  navVisible:Boolean= false;
  ngOnInit(){
    this.navVisible = localStorage.getItem('user')!=null;
  }
}
