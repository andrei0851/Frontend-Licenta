import { Component, OnInit } from '@angular/core';
import {AbstractControl, Form, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators,} from '@angular/forms';
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {ListingService} from "../services/listing.service";
import {Router} from "@angular/router";


export class searchData{
  makeID!: number;
  modelID!: number;
  priceMin!: number;
  priceMax!: number;
  kmMin!: number;
  kmMax!: number;

  constructor(
    makeID: number,
    modelID: number,
    priceMin: number,
    priceMax: number,
    kmMin: number,
    kmMax: number) {
    this.makeID=makeID;
    this.modelID = modelID;
    this.priceMin = priceMin;
    this.priceMax = priceMax;
    this.kmMin = kmMin;
    this.kmMax = kmMax;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  qsearchform!: FormGroup;
  make = new FormControl();
  model = new FormControl();
  selectedmake!: number;
  selectedmodel!: number;
  token?: string;
  makeList!: any[];
  modelList!: any[];
  filteredMakeList!: Observable<any[]>;
  filteredModelList!: Observable<any[]>;
  total?: number;
  vehicles!: any[];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private listingService: ListingService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.getMakes();
    this.getTotal();
    this.model.disable();
    this.token = window.localStorage.getItem('token') ?? "";
    this.filteredMakeList = this.make.valueChanges.pipe(
      startWith(''),
      map(make => this.filterMake(make)),
    );
    this.getPromoted();
  }

  createForm(): void {
    this.qsearchform = this.fb.group({
      make:[null],
      model:[null],
      priceMin:[null],
      priceMax:[null],
      kmMin:[null],
      kmMax:[null]
    });
  }

  private getPromoted() {
    this.listingService.getPromoted().subscribe((response: any) => {
      this.vehicles = response.array;
    });
  }


  getTotal(){
    this.listingService.getTotal().subscribe((response: any) => {
      if(response == null){
        this.total = 0;
      }
      else{
        this.total = response;
      }
    })
  }

  getMakes() {
    this.listingService.getMakes().subscribe((response: any) => {
      this.makeList = response.array;
      this.make.setValue('');
    });
  }

  getModels(id: string) {
    this.model.setValue('');
    this.listingService.getModels(id).subscribe((response: any) => {
      this.modelList = response.array;
      this.model.setValue('');
      this.subscribeModelChanges();
    });
  }

  subscribeModelChanges() {
    this.filteredModelList = this.model.valueChanges.pipe(
      startWith(''),
      map(model => this.filterModel(model)),
    );
  }

  filterModel(value: string){
    const filterValue = value.toLowerCase();
    return this.modelList.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  filterMake(value: string){
    const filterValue = value.toLowerCase();
    return this.makeList?.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  get priceMin(){
    return this.qsearchform.get('priceMin');
  }
  get priceMax(){
    return this.qsearchform.get('priceMax');
  }
  get kmMin(){
    return this.qsearchform.get('kmMin');
  }
  get kmMax(){
    return this.qsearchform.get('kmMax');
  }

  submit() {
    this.router.navigate(['/results'],{
      queryParams: {
        make: this.selectedmake,
        model: this.selectedmodel,
        priceMin: this.priceMin?.value,
        priceMax: this.priceMax?.value,
        kmMin: this.kmMin?.value,
        kmMax: this.kmMax?.value
      }
    })
  }
}
