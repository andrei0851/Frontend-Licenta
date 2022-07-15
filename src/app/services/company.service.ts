import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {H} from "@angular/cdk/keycodes";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private readonly resourceUrl: string = '/Company';
  private readonly baseUrl: string = environment.server;

  constructor(private http: HttpClient) { }


  addCompany(companyName: string, address: string, email: string) {
    const params: HttpParams = new HttpParams().set('companyName',companyName).set('address',address).set('email',email);
    return this.http.post(`${this.baseUrl}${this.resourceUrl}` + '/addCompany',null, {params});
  }

  addBranch(name: string, address: string, phonenumber: string){
    const params: HttpParams = new HttpParams().set('name',name).set('address',address).set('phonenumber',phonenumber);
    return this.http.post(`${this.baseUrl}${this.resourceUrl}` + '/addBranch',null, {params});
  }

  getBranches(){
    return this.http.get(`${this.baseUrl}${this.resourceUrl}` + '/getMyBranches');
  }

  addUser(branchID: number, email: string){
    const params: HttpParams = new HttpParams().set('BranchID', branchID,).set('email', email);
    return this.http.post(`${this.baseUrl}${this.resourceUrl}` + '/addUserToBranch',null, {params});
  }

  deleteBranch(branchID: number){
    const params: HttpParams = new HttpParams().set('branchID', branchID);
    return this.http.delete(`${this.baseUrl}${this.resourceUrl}` + '/deleteBranch',{params});
  }

  deleteCompany(companyID: number){
    const params: HttpParams = new HttpParams().set('companyID', companyID);
    return this.http.delete(`${this.baseUrl}${this.resourceUrl}` + '/deleteCompany',{params});
  }

  getCompanies() {
    return this.http.get(`${this.baseUrl}${this.resourceUrl}` + '/getCompanies');
  }

  changeOwner(companyID: number, email: string){
    const params: HttpParams = new HttpParams().set('companyID',companyID).set('email',email);
    return this.http.patch(`${this.baseUrl}${this.resourceUrl}` + '/changeOwner',null,{params});
  }

  getCompany(companyID: any) {
    const params: HttpParams = new HttpParams().set('companyID',companyID);
    return this.http.get(`${this.baseUrl}${this.resourceUrl}` + '/getCompany',{params});
  }

  getBranch(branchID: any) {
    const params: HttpParams = new HttpParams().set('branchID',branchID);
    return this.http.get(`${this.baseUrl}${this.resourceUrl}` + '/getBranch',{params});
  }

  getMyCompany() {
    return this.http.get(`${this.baseUrl}${this.resourceUrl}` + '/getMyCompany');
  }

  getSellers(branchID: number) {
    const params: HttpParams = new HttpParams().set('branchID',  branchID);
    return this.http.get(`${this.baseUrl}${this.resourceUrl}` + '/getSellers',{params});
  }

  getBranchListings(id: number) {
    const params: HttpParams = new HttpParams().set('branchID', id);
    return this.http.get(`${this.baseUrl}${this.resourceUrl}` + '/getBranchListings',{params});
  }

}
