import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../services/account.service";
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage?: string;
  forgotpassword!: FormGroup;
  @ViewChild('myModalClose') modalClose: any;
  constructor(private formBuilder: FormBuilder, private accountService: AccountService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });

    this.forgotpassword = this.formBuilder.group({
      forgotemail: [null, [Validators.required, Validators.email]],
    });
  }

  submit(){
    if (this.loginForm.invalid){
      window.alert("Invalid login form.")
    }
    else{
      this.accountService.login(this.loginForm.value).subscribe((response: any) => {
        localStorage.setItem('token', response.token);
        window.location.href = ''
      }, error => {
        this.errorMessage = error;
      });
    }
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password')
  }

  get forgotemail(){
    return this.forgotpassword.get('forgotemail');
  }

  forgotpass() {
    this.accountService.forgotPassword(this.forgotemail?.value).subscribe((response: any) => {
      window.alert(response.message);
      this.modalClose.nativeElement.click();
    }, (error) => {
      window.alert(error);
    });
  }
}

