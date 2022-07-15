import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {H} from "@angular/cdk/keycodes";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  token: string;

  private readonly resourceUrl: string = '/Account';
  private readonly baseUrl: string = environment.server;

  constructor(private http: HttpClient) {
    this.token = window.localStorage.getItem('token') ?? "";
  }

  register(body: any){
    return this.http.post(this.baseUrl + this.resourceUrl + '/Register', body);
  }

  login(body: any){
    return this.http.post(this.baseUrl + this.resourceUrl + '/Login', body);
  }

  changePassword(newPassword: string, oldPassword: string){
    const params: HttpParams = new HttpParams().set('oldPassword', oldPassword).set('newPassword', newPassword);
    return this.http.patch(`${this.baseUrl}${this.resourceUrl}` + '/changeUserPassword',null, {params});
  }

  changepass(email: string,newPassword: string){
    const params: HttpParams = new HttpParams().set('email', email).set('newPassword', newPassword);
    return this.http.patch(`${this.baseUrl}${this.resourceUrl}` + '/changePassword',null, {params});
  }

  deletePicture()
   {
    return this.http.delete(`${this.baseUrl}${this.resourceUrl}` + '/deleteProfilePicture');
  }

  changeEmail(password: string, newEmail: string) {
    const params: HttpParams = new HttpParams().set('newEmail',newEmail).set('password',password);
    return this.http.patch(`${this.baseUrl}${this.resourceUrl}` + '/changeUserEmail',null, {params});
  }

  getName(){
    return this.http.get(`${this.baseUrl}${this.resourceUrl}` + '/getName');
  }

  getProfilePicture(){
    return this.http.get(`${this.baseUrl}${this.resourceUrl}` + '/getMyProfilePicture');
  }

  addProfilePhoto(formData: FormData){
    return this.http.post(`${this.baseUrl}${this.resourceUrl}` + '/addPhoto',formData);
  }

  getUser(UserID: any) {
    const params: HttpParams = new HttpParams().set('UserID',UserID);
    return this.http.get(`${this.baseUrl}${this.resourceUrl}` + '/getUser', {params});
  }

  getProfilePictureUser(UserID: any){
    const params = new HttpParams().set('UserID', UserID);
    return this.http.get(`${this.baseUrl}${this.resourceUrl}` + '/getProfilePicture',{params});
  }

  confirm(token: string, email: string) {
    const params = new HttpParams().set('token', token).set('email',email);
    return this.http.get(`${this.baseUrl}${this.resourceUrl}` + '/confirmEmail',{params});
  }

  forgotPassword(email: string) {
    const params = new HttpParams().set('email',email);
    return this.http.get(`${this.baseUrl}${this.resourceUrl}` + '/forgotPassword',{params});
  }

  resetPassword(email: string, token: string, newPassword: string) {
    const params = new HttpParams().set('email', email).set('token', token).set('newPassword', newPassword);
    return this.http.patch(`${this.baseUrl}${this.resourceUrl}` + '/resetPassword',null,{params});
  }
}
