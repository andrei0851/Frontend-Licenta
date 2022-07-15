import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CompanyService} from "../services/company.service";

@Component({
  selector: 'app-branch-detail',
  templateUrl: './branch-detail.component.html',
  styleUrls: ['./branch-detail.component.scss']
})
export class BranchDetailComponent implements OnInit {

  id!: number;
  company!: any;
  branch!: any;
  vehicles!: any;

  constructor(private activatedRoute: ActivatedRoute, private companySerivce: CompanyService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.companySerivce.getBranch(this.id).subscribe((response: any) =>{
      this.company = response.company[0];
      this.branch = response.branch;
    });
    this.companySerivce.getBranchListings(this.id).subscribe((response:any)=> {
      this.vehicles = response.array;
    });
  }

}
