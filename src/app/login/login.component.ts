import { AppStore } from 'src/app/app.store';
import { Router } from '@angular/router';
import { AccountService } from './../account.service';
import { AuthService } from './../auth.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  errorMessage: string

  constructor(private store: AppStore, private authService: AuthService, private accountService: AccountService , private router: Router) { }

  ngOnInit(): void {
    if(this.store.showDashboardNav){
      this.router.navigate(['dashboard']);
    }
    this.loginForm = new FormGroup({
      email: new FormControl(""),
      password: new FormControl('')
    })
  }
  submit(event):void{
    this.accountService.login(this.loginForm.value).then((data)=>{
      this.store.updateStore('showDashboardNav', true);
      this.router.navigate(['dashboard']);
      // localStorage.setItem
    })
    .catch(error=>{
      this.errorMessage = 'Username or password invalid'
      // console.log(error);
    }
    );


  }

}
