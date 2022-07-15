import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ListingService} from "../services/listing.service";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {listingData} from "../add-listing/add-listing.component";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  vehicle: any = null;
  image1!: File;
  pic1: any;
  pic2: any;
  pic3: any;
  pic4: any;
  images!: any[];
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
  constructor(private fb: FormBuilder,
              private listingService: ListingService) {
    this.vehicle=history.state;
  }

  ngOnInit(): void {
    if(this.vehicle.id == null){
      window.alert("No vehicle loaded, please go to my listings from the account tab.")
      window.location.href="/";
    }
    this.createForm();
    this.getColors();
    this.getMakes();
    this.getFuel();
    this.getTypes();
    this.getCountries();
    this.load();
  }

  load():void{
    this.listingService.getListingPhotos(this.vehicle.id).subscribe((response: any) => {
      this.images = response.array;
      this.images.sort((a,b) => a.order < b.order ? -1 :1);
      this.pic1 = this.images[0].imageURL;
      this.pic2 = this.images[2].imageURL;
      this.pic3 = this.images[1].imageURL;
      this.pic4 = this.images[3].imageURL;
    })
    this.listingService.getModels(this.vehicle.makeID).subscribe((response: any) => {
      this.modelList = response.array;
      this.model.setValue(this.vehicle.model);
      this.subscribeModelChanges();
    });
    this.selectedmodel = this.vehicle.modelID;
    this.condition=this.vehicle.condition;
    this.selectedmake = this.vehicle.makeID;
    this.selectedtype = this.vehicle.vehicleTypeId;
    this.selectedcolor = this.vehicle.vehicleColorId;
    this.selectedcountry = this.vehicle.countryID;
    this.selectedfuel = this.vehicle.fuelTypeId;
  }

  createForm():void{
    this.addlisting = this.fb.group({
      price:[this.vehicle.price,[Validators.required]],
      km:[this.vehicle.km,[Validators.required]],
      manufactureYear:[this.vehicle.manufactureYear,[Validators.required]],
      VIN: [this.vehicle.vin,[Validators.minLength(17)]],
      description: [this.vehicle.description,[Validators.required,Validators.minLength(20)]],
      power:[this.vehicle.power,[Validators.required]],
      cc:[this.vehicle.cc,[Validators.required]]
    })
  }

  getMakes() {
    this.listingService.getMakes().subscribe((response: any) => {
      this.makeList = response.array;
      this.make.setValue(this.vehicle.make);
      this.subscribeMakeChanges();
    });
  }

  subscribeMakeChanges() {
    this.filteredMakeList = this.make.valueChanges.pipe(
      startWith(''),
      map(make => this.filterMake(make))
    );
  }

  getColors(){
    this.listingService.getColors().subscribe((response: any) =>{
      this.colorsList = response.array;
      this.color.setValue(this.vehicle.color);
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
      this.country.setValue(this.vehicle.country);
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
      this.type.setValue(this.vehicle.type);
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
      this.fuel.setValue(this.vehicle.fuel);
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

  public findInvalidControls() {
    const invalid = [];
    const controls = this.addlisting.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
  }

  invalidForm(){
    return !(this.selectedmake == null || this.selectedmodel == null || this.selectedfuel == null || this.selectedcolor == null || this.selectedcountry == null || this.selectedtype == null);
  }

  submit() {

    if(this.addlisting.invalid || !this.invalidForm()){
      return window.alert("Invalid form. Please check the fields again.")
    }

    const listingPayload = new listingData(
      this.selectedmake,this.selectedmodel,
      this.price?.value,this.km?.value,this.manufactureYear?.value,
      this.condition,this.selectedfuel,this.selectedtype,this.VIN?.value,
      this.selectedcolor,this.cc?.value,this.power?.value,this.selectedcountry,this.description?.value);
    this.findInvalidControls();

    this.listingService.editListing(listingPayload,this.vehicle.id).subscribe((response: any) =>
    {
      if(this.image1 != null){
        const fd = new FormData();
        fd.append('image',this.image1 !!, this.image1?.name);
        this.listingService.editPhoto(fd,this.vehicle.id,1).subscribe(()=> {
        });
      }
      if(this.image2 != null){
        const fd = new FormData();
        fd.append('image',this.image2 !!, this.image2?.name);
        this.listingService.editPhoto(fd,this.vehicle.id,3).subscribe(() => {

        });
      }
      if(this.image3 != null){
        const fd = new FormData();
        fd.append('image',this.image3 !!, this.image3?.name);
        this.listingService.editPhoto(fd,this.vehicle.id,2).subscribe(() => {

        });
      }
      if(this.image4 != null){
        const fd = new FormData();
        fd.append('image',this.image4 !!, this.image4?.name);
        this.listingService.editPhoto(fd,this.vehicle.id,4).subscribe(() => {

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
    let reader = new FileReader();
    reader.readAsDataURL(<File>event.target.files[0]);
    reader.onload = (_event) => {
      this.pic1 = reader.result;
    }
  }

  selectImage2(event: any) {
    this.image2 = <File>event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(<File>event.target.files[0]);
    reader.onload = (_event) => {
      this.pic2 = reader.result;
    }
  }

  selectImage3(event: any) {
    this.image3 = <File>event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(<File>event.target.files[0]);
    reader.onload = (_event) => {
      this.pic3 = reader.result;
    }
  }

  selectImage4(event: any) {
    this.image4 = <File>event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(<File>event.target.files[0]);
    reader.onload = (_event) => {
      this.pic4 = reader.result;
    }
  }
}
