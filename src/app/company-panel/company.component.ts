import { Component, OnInit } from '@angular/core';
import {CompanyService} from "../services/company.service";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-company-panel',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  company: any;
  sellers: any;
  branchList!: any[];
  userList!: any[];
  branchID = new FormControl();
  user = new FormControl();
  branch!: number;
  filteredBranches!: Observable<any[]>;
  filteredUsers!: Observable<any[]>;
  selecteduser!: number;

  constructor(private companyService: CompanyService) {
    this.companyService.getMyCompany().subscribe((response: any) => {
      this.company = response.company;
      this.sellers = response.sellers;
    });
  }

  ngOnInit(): void {
    this.getBranches();
    this.user.disable();
    this.filteredBranches = this.branchID.valueChanges.pipe(
      startWith(''),
      map(branch => this.filterBranch(branch)),
    )
  }

  getBranches() {
    this.companyService.getBranches().subscribe((response: any) => {
      this.branchList = response.array;
      this.branchID.setValue('');
    });
  }

  filterBranch(value: string){
    const filterValue = value.toLowerCase();
    return this.branchList?.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getUsers(id: number){
    this.user.setValue('');
    this.companyService.getSellers(id).subscribe((response:any) => {
      this.userList = response.array;
      this.user.setValue('');
      this.subscribeUserChanges();
    })

  }

  filter() {
    this.companyService.getSellers(this.branch).subscribe((response: any) => {
      this.sellers = response.array;
;    })
  }

  filterUser(value: string) {
    const filterValue = value.toLowerCase();
    return this.userList.filter(option => option.firstname.toLowerCase().includes(filterValue));
  }

  subscribeUserChanges() {
    this.filteredUsers = this.user.valueChanges.pipe(
      startWith(''),
      map(user => this.filterUser(user)),
    );
  }
}
