import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  private readonly baseUrl = environment.server;
  private readonly url = '/Listings'

  constructor(
    private http: HttpClient
  ) { }

  getMakes(){
    return this.http.get( this.baseUrl + this.url + '/getMakes');
  }

  getModels(makeId: string) {
    const params = new HttpParams().set("makeID", makeId);
    return this.http.get( this.baseUrl + this.url + '/getModels', {params});
  }

  getTypes(){
    return this.http.get( this.baseUrl + this.url + '/getTypes');
  }

  getCountries(){
    return this.http.get( this.baseUrl + this.url + '/getCountries');
  }

  getColors(){
    return this.http.get( this.baseUrl + this.url + '/getColors');
  }

  getFuel(){
    return this.http.get( this.baseUrl + this.url + '/getFuelTypes');
  }

  getTotal(){
    return this.http.get(`${this.baseUrl}${this.url}` + '/getTotalListings');
  }

  search(body: any) {
    return this.http.post(`${this.baseUrl}${this.url}` + '/searchListings',body);
  }

  addListing(body: any){
    return this.http.post(`${this.baseUrl}${this.url}` + '/addListing',body);
  }

  addPhoto(formData: FormData, listingID: number, order:number){
    const params = new HttpParams().set('listingID',listingID).set('order',order);
    return this.http.post(`${this.baseUrl}${this.url}` + '/addPhoto',formData,{params});
  }

  getMyListings() {
    return this.http.get(`${this.baseUrl}${this.url}` + '/getMyListings');
  }

  getFavorites() {
    return this.http.get(`${this.baseUrl}${this.url}` + '/getFavorites');
  }

  getPromoted() {
    return this.http.get(`${this.baseUrl}${this.url}` + '/getPromoted');
  }

  isFav(vehicleID: number) {
    const params = new HttpParams().set('vehicleID',vehicleID);
    return this.http.get(`${this.baseUrl}${this.url}` + '/isFavorite',{params});
  }

  addFav(vehicleID: number) {
    const params = new HttpParams().set('vehicleID',vehicleID);
    return this.http.post(`${this.baseUrl}${this.url}` + '/addFavorite',null,{params});
  }

  remFav(vehicleID: number) {
    const params = new HttpParams().set('vehicleID',vehicleID);
    return this.http.delete(`${this.baseUrl}${this.url}` + '/removeFavorite',{params});
  }

  getListing(id: number) {
    return this.http.get(`${this.baseUrl}${this.url}` + '/getListing/' + id);
  }

  getListingPhotos(listingID: number){
    const params = new HttpParams().set('listingID', listingID);
    return this.http.get(`${this.baseUrl}${this.url}` + '/getListingPhotos/',{params});
  }

  buyVehicle(id: number, proofOfPayment: string) {
    const params = new HttpParams().set('vehicleID',id).set('proof',proofOfPayment);
    return this.http.post(`${this.baseUrl}${this.url}` + '/buyVehicle',null,{params});
  }

  promote(id: number, days: string) {
    const params = new HttpParams().set('vehicleID',id).set('days',days);
    return this.http.post(`${this.baseUrl}${this.url}` + '/buyPromoted',null,{params});
  }

  editListing(body: any,vehicleID: number){
    const params = new HttpParams().set('vehicleID',vehicleID);
    return this.http.patch(`${this.baseUrl}${this.url}` + '/editListing',body,{params});
  }

  editPhoto(formData: FormData, listingID: number, order:number){
    const params = new HttpParams().set('listingID',listingID).set('order',order);
    return this.http.patch(`${this.baseUrl}${this.url}` + '/editPhoto',formData,{params});
  }

  delete(id: number) {
    const params = new HttpParams().set('vehicleID', id);
    return this.http.delete(`${this.baseUrl}${this.url}` + '/deleteListing',{params});
  }

  addMake(make: string) {
    const params = new HttpParams().set('name',make);
    return this.http.post(`${this.baseUrl}${this.url}` + '/addMake','',{params});
  }

  addModel(makeID: number, name: string) {
    const params = new HttpParams().set('makeID',makeID).set('name',name);
    return this.http.post(`${this.baseUrl}${this.url}` + '/addModel','',{params});
  }

  deleteManufacturer(makeID: number){
    const params = new HttpParams().set('makeID', makeID);
    return this.http.delete(`${this.baseUrl}${this.url}` + '/deleteMake',{params});
  }

  deleteModel(modelID: number){
    const params = new HttpParams().set('modelID', modelID);
    return this.http.delete(`${this.baseUrl}${this.url}` + '/deleteModel',{params});
  }

  getRemainingListings() {
    return this.http.get(`${this.baseUrl}${this.url}` + '/getRemainingListings/');
  }

  isAvailable(id : number) {
    const params = new HttpParams().set('vehicleID', id);
    return this.http.get(`${this.baseUrl}${this.url}` + '/isAvailable/',{params});
  }
}
