import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CompanyService} from "../services/company.service";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  branchForm!: FormGroup;
  userBranch!: FormGroup;
  errorMessage!: string;
  branchID = new FormControl();
  deleteBranch = new FormControl();
  branchList!: any[];
  branchDeteleList!: any[];
  branch!: number;
  branchdelete!: number;
  filteredBranches!: Observable<any[]>;
  filteredBranchesDelete!: Observable<any[]>;

  constructor(private fb: FormBuilder, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.createForm();
    this.errorMessage = '';
    this.getBranchesDelete();
    this.getBranches();
    this.filteredBranches = this.branchID.valueChanges.pipe(
      startWith(''),
      map(branch => this.filterBranch(branch)),
    )
    this.filteredBranchesDelete = this.deleteBranch.valueChanges.pipe(
      startWith(''),
      map(branch => this.filterDeleteBranch(branch)),
    )
  }

  createForm() {
    this.branchForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      address: [null, [Validators.required, Validators.minLength(5)]],
      phonenumber: [null, [Validators.required, Validators.minLength(10)]],
    });
    this.userBranch = this.fb.group({
      branchID: [null,[Validators.required]],
      userMail: [null, [Validators.required, Validators.email]],
    });
  }

  submit() {
    this.companyService.addBranch(this.name?.value,this.address?.value,this.phonenumber?.value).subscribe((response: any) =>
    {
      window.alert(response.status);
      this.getBranchesDelete();
      this.getBranches();
    },(error) => {
      this.errorMessage = error;
    })
  }

  get name(){
    return this.branchForm.get('name');
  }

  get address(){
    return this.branchForm.get('address');
  }

  get phonenumber(){
    return this.branchForm.get('phonenumber');
  }

  filterBranch(value: string){
    const filterValue = value.toLowerCase();
    return this.branchList?.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  filterDeleteBranch(value: string){
    const filterValue = value.toLowerCase();
    return this.branchDeteleList?.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getBranches() {
    this.companyService.getBranches().subscribe((response: any) => {
      this.branchList = response.array;
      this.branchID.setValue('');
    });
  }
  getBranchesDelete() {
    this.companyService.getBranches().subscribe((response: any) => {
      this.branchDeteleList = response.array;
      this.deleteBranch.setValue('');
    });
  }

  get userMail(){
    return this.userBranch.get('userMail');
  }

  addUser() {
    if(this.branch == null) return window.alert("No branch selected!");
    this.companyService.addUser(this.branch,this.userMail?.value).subscribe((response: any) => {
      if(response.status) {
        window.alert(response.status);
      }
    },(error) =>
    {
      window.alert(error);
    });
  }

  delBranch() {
  if(this.branchdelete == null) return window.alert("No branch selected!");
  this.companyService.deleteBranch(this.branchdelete).subscribe((response: any) =>{
    if(response.status){
      window.alert(response.status);
      this.getBranches();
      this.getBranchesDelete();
    }
  }, (error) =>{
    window.alert(error);
  });
  }
}
