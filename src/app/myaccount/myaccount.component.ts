import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {AccountService} from "../services/account.service";

export class changePassData {
  oldpassword : string;
  newpassword : string;
  confnewpassword: string;

  constructor(oldpassword: string, newpassword: string, confnewpassword: string) {
    this.oldpassword = oldpassword;
    this.newpassword = newpassword;
    this.confnewpassword = confnewpassword;
  }
}

export class changeEmailData{
  password: string;
  newEmail: string;
  confirmnewEmail: string;

  constructor(password: string, newEmail: string, confirmnewEmail: string) {
    this.password = password;
    this.newEmail = newEmail;
    this.confirmnewEmail = confirmnewEmail;
  }
}

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})



export class MyaccountComponent implements OnInit {
  changepassForm!: FormGroup;
  submittedPressedPass = false;
  errormessagePass?: string;
  successpass = false;
  selectedFile?: File;
  changeEmailForm!: FormGroup;
  submittedPressedEmail = false;
  errormessageEmail?: string;
  successemail = false;
  name?: string;
  profilepicture?: string;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService) { }

  ngOnInit(): void {
    this.createForm();
    this.getname();
    this.getprofilepicture();
  }

  createForm() : void {
    this.changepassForm = this.formBuilder.group({
      oldpassword: [null, [Validators.required, Validators.minLength(8)]],
      newpassword: [null, [Validators.required, Validators.minLength(8)]],
      confnewpassword: [null, [Validators.required, Validators.minLength(8)]]
    },{validators: this.confPasswordMatchesValidator()});

    this.changeEmailForm = this.formBuilder.group({
      password: [null, [Validators.required, Validators.minLength(8)]],
      newEmail: [null, [Validators.required, Validators.email]],
      confirmnewEmail: [null, Validators.required, Validators.email],
    },{validators: this.confEmailMatchesValidator()})
  }

  submitpass() {
    if (this.changepassForm.invalid){
      window.alert("Invalid change password form. Please fill all the fields.")
      return;
    }
    this.submittedPressedPass = true;
    const changePassData1: changePassData = new changePassData(this.oldpassword?.value,this.newpassword?.value,this.confnewpassword?.value)
    this.accountService.changePassword(changePassData1.newpassword,changePassData1.oldpassword).subscribe(
      (response: any) => {
      if(response.status) {this.successpass = true}},error =>{
        this.errormessagePass = error;
    });

  }

  confPasswordMatchesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.get('newpassword')?.value !== control.get('confnewpassword')?.value
        ? { confnewPass: true }
        : null;
    };
  }

  confEmailMatchesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.get('newEmail')?.value !== control.get('confirmNewEmail')?.value
        ? { confnewEmail: true }
        : null;
    };
  }
  get oldpassword() {
    return this.changepassForm.get('oldpassword');
  }

  get newpassword(){
    return this.changepassForm.get('newpassword');
  }

  get confnewpassword(){
    return this.changepassForm.get('confnewpassword');
  }

  get password(){
    return this.changeEmailForm.get('password');
  }

  get newEmail(){
    return this.changeEmailForm.get('newEmail');
  }

  get confirmNewEmail(){
    return this.changeEmailForm.get('confirmNewEmail');
  }


  submitEmail() {
    if (this.changeEmailForm.invalid){
      window.alert("Invalid change password form. Please fill all the fields.")
      return;
    }
    this.submittedPressedEmail = true;
    const changeEmailData1: changeEmailData = new changeEmailData(this.password?.value,this.newEmail?.value,this.confirmNewEmail?.value)
    this.accountService.changeEmail(changeEmailData1.newEmail,changeEmailData1.password).subscribe(
      (response: any) => {
        if(response.status) {this.successemail = true}},error =>{
        this.errormessageEmail = error;
      });
    if (this.changeEmailForm.invalid){
      window.alert("Invalid change password form. Please fill all the fields.")
    }

  }

  getname() {
    this.accountService.getName().subscribe((response:any) =>{
      this.name = response.name;
    });
  }

  getprofilepicture(){
    this.accountService.getProfilePicture().subscribe((response:any) =>{
      this.profilepicture = response.imgLink;
    });
  }

  onFileSelected(event: any){
    this.selectedFile = <File>event.target.files[0];
    const fd = new FormData();
    fd.append('image',this.selectedFile !!,this.selectedFile?.name);
    this.accountService.addProfilePhoto(fd).subscribe((response:any) => {
      this.profilepicture = response.uri;
    });
  }

  deletePhoto() {
    this.accountService.deletePicture().subscribe((response:any) => {
      this.getprofilepicture();
    });
  }
}
