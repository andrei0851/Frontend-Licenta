import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {AccountService} from '../services/account.service';

export class RegisterData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phonenumber: string;

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    phonenumber: string
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.phonenumber = phonenumber;
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submittedPressed = false;
  success = false;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.errorMessage = '';
  }

  createForm(): void {
    this.registerForm = this.formBuilder.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      passwords: this.formBuilder.group(
        {
          password: [null, [Validators.required, Validators.minLength(8)]],
          confPassword: [null, [Validators.required]],
        },
        {validators: this.confPasswordMatchesValidator()}
      ),
      phonenumber: [null,[Validators.required, Validators.pattern('^\\+\\d{10,13}$')]]
    });
  }

  confPasswordMatchesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.get('password')?.value !== control.get('confPassword')?.value
        ? { confPass: true }
        : null;
    };
  }

  submit(): void {
    this.submittedPressed = true;
    if (this.registerForm.invalid){
      window.alert("Invalid register form. Please fill all the fields.")
    }

    const registerData1: RegisterData = new RegisterData(
      this.firstname?.value,
      this.lastname?.value,
      this.email?.value,
      this.password?.value,
      this.phonenumber?.value
    );

    this.accountService.register(registerData1).subscribe(
      (response: any) => {
        if (response.status) { this.success = true; }
        },
      (error) => {
        window.alert(error);
      }
    );
  }

  get firstname() {
    return this.registerForm.get('firstname');
  }

  get phonenumber() {
    return this.registerForm.get('phonenumber');
  }

  get lastname() {
    return this.registerForm.get('lastname');
  }


  get email() {
    return this.registerForm.get('email');
  }

  get passwords() {
    return this.registerForm.get('passwords');
  }

  get password() {
    return this.registerForm.get('passwords')?.get('password');
  }

  get confPassword() {
    return this.registerForm.get('passwords')?.get('confPassword');
  }
}
