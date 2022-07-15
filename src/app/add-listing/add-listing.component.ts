import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ListingService} from "../services/listing.service";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import jwtDecode from "jwt-decode";

export class listingData{
  makeID!: number;
  modelID!: number;
  price!: number;
  km!: number;
  manufactureYear!: number;
  condition!: string;
  fuel!: number;
  vehicleType!: number;
  VIN!: string;
  color!: number;
  cc!: number;
  power!: number;
  countryID!: number;
  description!: string;

  constructor(makeID:number,
              modelID:number,
              price:number,
              km:number,
              manufactureYear:number,
              condition: string,
              fuel: number,
              vechileType: number,
              VIN: string,
              color: number,
              cc: number,
              power: number,
              countryID: number,
              description: string) {

    this.makeID = makeID;
    this.modelID = modelID;
    this.price = price;
    this.km = km;
    this.manufactureYear = manufactureYear;
    this.condition = condition;
    this.fuel = fuel;
    this.vehicleType = vechileType;
    this.VIN = VIN;
    this.color = color;
    this.cc = cc;
    this.power = power;
    this.countryID = countryID;
    this.description = description;
  }
}

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.scss']
})
export class AddListingComponent implements OnInit {

  image1!: File;
  pic1: any;
  pic2: any;
  pic3: any;
  pic4: any;
  image2!: File;
  image3!: File;
  image4!: File;
  addlisting!: FormGroup;
  make = new FormControl();
  selectedmake!: number;
  model = new FormControl();
  selectedmodel!: number;
  color = new FormControl();
  selectedcolor!: number;
  fuel = new FormControl();
  selectedfuel! : number;
  country = new FormControl();
  selectedcountry!: number;
  type = new FormControl();
  selectedtype!: number;
  condition!: string;
  typeList!: any[];
  countryList!: any[];
  makeList!: any[];
  modelList!: any[];
  colorsList!: any[];
  fuelTypesList!: any[];
  filteredMakeList!: Observable<any[]>;
  filteredModelList!: Observable<any[]>;
  filteredColorsList!: Observable<any[]>;
  filteredFuelList!: Observable<any[]>;
  filteredCountryList!: Observable<any[]>;
  filteredTypeList!: Observable<any[]>;
  total?: number;
  remainingListings!: any;
  role!: any;
  token!: any;

  constructor(
    private fb: FormBuilder,
    private listingService: ListingService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.model.disable();
    this.getColors();
    this.getMakes();
    this.getFuel();
    this.getTypes();
    this.getCountries();
    this.filteredMakeList = this.make.valueChanges.pipe(
      startWith(''),
      map(make => this.filterMake(make)),
    );
    this.token = window.localStorage.getItem('token') ?? "";
    const tokenInfo = this.getDecodedAccessToken();
    this.role = tokenInfo?.Role;
    if(this.token && this.role == "User"){
      this.listingService.getRemainingListings().subscribe((response: any) => {
        this.remainingListings = response;
      })
    }
  }

  createForm():void{
    this.addlisting = this.fb.group({
      price:[null,[Validators.required]],
      km:[null,[Validators.required]],
      manufactureYear:[null,[Validators.required]],
      VIN: [null,[Validators.minLength(17)]],
      description: [null,[Validators.required,Validators.minLength(20)]],
      power:[null,[Validators.required]],
      cc:[null,[Validators.required]]
    })
  }

  getMakes() {
    this.listingService.getMakes().subscribe((response: any) => {
      this.makeList = response.array;
      this.make.setValue('');
    });
  }

  getColors(){
    this.listingService.getColors().subscribe((response: any) =>{
      this.colorsList = response.array;
      this.color.setValue('');
      this.subscribeColorChanges();
    })
  }

  subscribeColorChanges() {
    this.filteredColorsList = this.color.valueChanges.pipe(
      startWith(''),
      map(color => this.filterColor(color))
    );
  }

  getCountries(){
    this.listingService.getCountries().subscribe((response: any) =>{
      this.countryList = response.array;
      this.country.setValue('');
      this.subscribeCountryChanges();
    })
  }

  subscribeCountryChanges() {
    this.filteredCountryList = this.country.valueChanges.pipe(
      startWith(''),
      map(country => this.filterCountry(country))
    );
  }

  getTypes(){
    this.listingService.getTypes().subscribe((response: any) =>{
      this.typeList = response.array;
      this.type.setValue('');
      this.subscribeTypeChanges();
    })
  }

  subscribeTypeChanges() {
    this.filteredTypeList = this.type.valueChanges.pipe(
      startWith(''),
      map(type => this.filterType(type))
    );
  }

  getFuel(){
    this.listingService.getFuel().subscribe((response: any) =>{
      this.fuelTypesList = response.array;
      this.fuel.setValue('');
      this.subscribeFuelChanges();
    })
  }

  subscribeFuelChanges() {
    this.filteredFuelList = this.fuel.valueChanges.pipe(
      startWith(''),
      map(fuel => this.filterFuel(fuel))
    );
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

  filterColor(value: string){
    const filterValue = value.toLowerCase();
    return this.colorsList.filter(option => option.color.toLowerCase().includes(filterValue));
  }

  filterCountry(value: string){
    const filterValue = value.toLowerCase();
    return this.countryList.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  filterType(value: string){
    const filterValue = value.toLowerCase();
    return this.typeList.filter(option => option.type.toLowerCase().includes(filterValue));
  }

  filterFuel(value: string){
    const filterValue = value.toLowerCase();
    return this.fuelTypesList.filter(option => option.fuel.toLowerCase().includes(filterValue));
  }

  filterMake(value: string){
    const filterValue = value.toLowerCase();
    return this.makeList?.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  get price(){
    return this.addlisting.get('price');
  }
  get km(){
    return this.addlisting.get('km');
  }
  get cc(){
    return this.addlisting.get('cc');
  }
  get power(){
    return this.addlisting.get('power');
  }
  get VIN(){
    return this.addlisting.get('VIN');
  }
  get manufactureYear(){
    return this.addlisting.get('manufactureYear');
  }
  get description(){
    return this.addlisting.get('description');
  }

  invalidForm(){
    if(this.selectedmake == null || this.selectedmodel == null || this.selectedfuel == null || this.selectedcolor == null || this.selectedcountry == null || this.selectedtype == null) return false;
    else return true;
  }

  submit() {

    if(this.addlisting.invalid || this.invalidForm() == false){
      return window.alert("Invalid form. Please check the fields again.")
    }

    const listingPayload = new listingData(
      this.selectedmake,this.selectedmodel,
      this.price?.value,this.km?.value,this.manufactureYear?.value,
      this.condition,this.selectedfuel,this.selectedtype,this.VIN?.value,
      this.selectedcolor,this.cc?.value,this.power?.value,this.selectedcountry,this.description?.value);

   this.listingService.addListing(listingPayload).subscribe((response: any) =>
    {
      if(this.image1 != null){
        const fd = new FormData();
        fd.append('image',this.image1 !!, this.image1?.name);
        this.listingService.addPhoto(fd,response.vehicleID,1).subscribe((response: any)=> {
        });
      }
      if(this.image2 != null){
        const fd = new FormData();
        fd.append('image',this.image2 !!, this.image2?.name);
        this.listingService.addPhoto(fd,response.vehicleID,3).subscribe((response:any) => {

        });
      }
      if(this.image3 != null){
        const fd = new FormData();
        fd.append('image',this.image3 !!, this.image3?.name);
        this.listingService.addPhoto(fd,response.vehicleID,2).subscribe((response:any) => {

        });
      }
      if(this.image4 != null){
        const fd = new FormData();
        fd.append('image',this.image4 !!, this.image4?.name);
        this.listingService.addPhoto(fd,response.vehicleID,4).subscribe((response:any) => {

        });
      }
      window.alert(response.status);
      window.location.href = "/my-listings"
    }, (error) =>
    {
      window.alert(error);
    })

  }

  selectImage1(event: any) {
    this.image1 = <File>event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(<File>event.target.files[0]);
    reader.onload = (_event) => {
      this.pic1 = reader.result;
    }
  }

  selectImage2(event: any) {
    this.image2 = <File>event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(<File>event.target.files[0]);
    reader.onload = (_event) => {
      this.pic2 = reader.result;
    }
  }

  selectImage3(event: any) {
    this.image3 = <File>event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(<File>event.target.files[0]);
    reader.onload = (_event) => {
      this.pic3 = reader.result;
    }
  }

  selectImage4(event: any) {
    this.image4 = <File>event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(<File>event.target.files[0]);
    reader.onload = (_event) => {
      this.pic4 = reader.result;
    }
  }

  getDecodedAccessToken(): any{
    try{
      return jwtDecode(this.token);
    }catch (Error){
      return null;
    }
  }
}
