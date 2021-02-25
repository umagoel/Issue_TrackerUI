import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
// import { Principal } from '@shared/auth';
import { finalize, takeUntil } from "rxjs/operators";
import { User } from "../User";
import { HttpClient } from "@angular/common/http";
// import {AccountService} from '../account.service'

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignUpComponent implements OnInit, AfterViewInit, OnDestroy {
  public signUpForm: FormGroup;
  public key: string;
  public user: User;
  public loading: boolean;
  public hidePasswordStrengthBar: boolean;

  constructor(
    private http: HttpClient,
    // private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) // public principal: Principal,
  // public configService: ConfigService
  {
    this.hidePasswordStrengthBar = true;
  }

  get firstName(): AbstractControl {
    return this.signUpForm.get("firstName");
  }

  get lastName(): AbstractControl {
    return this.signUpForm.get("lastName");
  }

  get emailId(): AbstractControl {
    return this.signUpForm.get("emailId");
  }

  get password(): AbstractControl {
    return this.signUpForm.get("password");
  }

  get confirmPassword(): AbstractControl {
    return this.signUpForm.get("confirmPassword");
  }

  public ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        firstName: [{ value: "", disable: true }, Validators.required],
        lastName: [{ value: "", disable: true }, Validators.required],
        emailId: new FormControl({ value: "", disable: true }, [
          Validators.required,
          Validators.email,
        ]),
        password: ["", Validators.required],
        confirmPassword: ["", [Validators.required]],
      },
      {
        // validator: PasswordValidation.Match('password', 'confirmPassword')
      }
    );
  }

  public ngAfterViewInit(): void {
    this.password.setValidators([Validators.required]);

    this.password.updateValueAndValidity();
  }

  public getUserByKey(key: string): void {
    this.http.get("").subscribe((f) => {});
    // this.accountService
    // .getUserByKey(key)
    // .subscribe(data => this.signUpForm.patchValue(data), () => this.router.navigate(['/account', 'login']));
  }

  public showResponse(response: string): void {
    this.signUpForm.patchValue({ captchaResponse: response });
  }

  public activate(): void {
    this.loading = true;
    const keyPassword: any = {};
    keyPassword.key = this.key;
    keyPassword.password = this.signUpForm.value.password;

    this.http.post<string>("/api/account/register", "").subscribe((data) => {});

    // this.accountService
    // .signupFinish(keyPassword)
    // .pipe(finalize(() => (this.loading = false)))
    // .subscribe(() => this.router.navigate(['/account', 'login']));
  }

  public ngOnDestroy(): void {}
}
