import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CompanyService} from "../services/company.service";
import {AccountService} from "../services/account.service";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {ListingService} from "../services/listing.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  companyform!: FormGroup;
  errorMessage!: string;
  passForm!: FormGroup;
  errorpass!: string;
  companyList!: any[];
  companyID = new FormControl();
  company!: number;
  companychange!: number;
  filteredCompanies!: Observable<any[]>;
  owner!: FormGroup;
  make = new FormControl('');
  makes: any;
  manufacturer: any;
  delmanufacturer: any;
  delmodel: any;
  model = new FormControl('');
  modelList: any;

  constructor(private fb: FormBuilder, private companyService: CompanyService, private accountService: AccountService, private listingService: ListingService) { }

  ngOnInit(): void {
    this.createform();
    this.errorMessage = '';
    this.errorpass = '';
    this.getCompanies();
    this.filteredCompanies = this.companyID.valueChanges.pipe(
      startWith(''),
      map(company => this.filterCompany(company)),
    )
    this.getMakes();
  }

  createform(): void{
    this.companyform = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      address: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
    })
    this.passForm = this.fb.group({
      emailpass: [null, [Validators.required, Validators.email]],
      newpassword: [null, [Validators.required, Validators.minLength(8)]]
    })
    this.owner = this.fb.group({
      companyID: [null, [Validators.required]],
      ownerMail: [null, [Validators.required, Validators.email]],
    })
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe((response: any) => {
      this.companyList = response.array;
      this.companyID.setValue('');
    });
  }

  filterCompany(value: string){
    const filterValue = value.toLowerCase();
    return this.companyList?.filter(option => option.companyName.toLowerCase().includes(filterValue));
  }

  get name(){
    return this.companyform.get('name');
  }

  get emailpass(){
    return this.passForm.get('emailpass');
  }

  get newpassword(){
    return this.passForm.get('newpassword');
  }

  get address(){
    return this.companyform.get('address');
  }

  get ownerMail(){
    return this.owner.get('ownerMail');
  }

  get email(){
    return this.companyform.get('email');
  }

  submit(): void {
      this.companyService.addCompany(this.name?.value,this.address?.value,this.email?.value).subscribe((response: any) =>
      {
        window.alert(response.status);}, (error) => {
        this.errorMessage = error;
      });
  }

  submitpass() {
    this.accountService.changepass(this.emailpass?.value,this.newpassword?.value).subscribe((response: any) =>{
      window.alert(response.status);}, (error) =>
    {
      this.errorpass = error;
    });
  }

  deleteCompany() {
  this.companyService.deleteCompany(this.companyID?.value).subscribe((response: any) =>{
    if(response.status) {
      window.alert(response.status);
      this.getCompanies();
    }
  }, (error) =>{
    window.alert(error);
  })
  }

  changeOwner() {
  this.companyService.changeOwner(this.companychange,this.ownerMail?.value).subscribe((response: any) =>{
    if(response.status) window.alert(response.status);
  }, (error) => {
    window.alert(error);
  });
  }

  addMake() {
    this.listingService.addMake(this.make.value).subscribe((response: any) => {
      window.alert(response.status);
      this.getMakes();
    }, (error) => {
      window.alert(error);
    })
  }

  addModel(){
    this.listingService.addModel(this.manufacturer,this.model.value).subscribe((response:any) => {
      window.alert(response.status);
      this.model.setValue('');
    }, (error) => {
      window.alert(error);
    })
  }

  getMakes() {
    this.listingService.getMakes().subscribe((response: any) => {
      this.makes = response.array;
    });
  }

  deleteManufacturer(){
    if(window.confirm("Are you sure you want to delete this manufacturer? WARNING: All models of this will be also removed.")){
      this.listingService.deleteManufacturer(this.delmanufacturer).subscribe((response:any) => {
        window.alert(response.status);
        this.getMakes();
      }, (error) => {
        window.alert(error);
      })
    }
  }

  getModels(id: any) {
    this.listingService.getModels(id).subscribe((response: any) => {
      this.modelList = response.array;
    });
  }

  deleteModel(){
  if(window.confirm("Are you sure you want to remove this model? ")){
    this.listingService.deleteModel(this.delmodel).subscribe((response:any) => {
      window.alert(response.status);
      this.delmodel = '';
    }, (error) => {
      window.alert(error);
    })
  }
  }
}
