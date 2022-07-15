import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../services/account.service";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  constructor(private route: ActivatedRoute, private accountService: AccountService, private formBuilder: FormBuilder) { }

  changepassForm!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() : void {
    this.changepassForm = this.formBuilder.group({
      newpassword: [null, [Validators.required, Validators.minLength(8)]],
      confnewpassword: [null, [Validators.required, Validators.minLength(8)]]
    }, {validators: this.confPasswordMatchesValidator()});
  }

  confPasswordMatchesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.get('newpassword')?.value !== control.get('confnewpassword')?.value
        ? { confnewPass: true }
        : null;
    };
  }

  get newpassword(){
    return this.changepassForm.get('newpassword');
  }

  get confnewpassword(){
    return this.changepassForm.get('confnewpassword');
  }

  submit() {

    if (this.changepassForm.invalid){
      window.alert("Invalid change password form. Please fill all the fields.")
      return;
    }


    const token = this.route.snapshot.queryParams['token'];
    const email = this.route.snapshot.queryParams['email'];


    this.accountService.resetPassword(email, token, this.newpassword?.value).subscribe((response: any) => {
      if(response.status == true){
        window.alert(response.message + " Redirecting to login..");
        window.location.href = '/login';
      }
    }, (error: any) => {
      window.alert(error.message);
    })
  }
}
