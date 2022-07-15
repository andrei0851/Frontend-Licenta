import { Component, OnInit } from '@angular/core';
import {ListingService} from "../services/listing.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  vehicles!: any[];

  constructor(private listingService: ListingService) { }

  ngOnInit(): void {
    this.getFavorites();
  }

  private getFavorites() {
    this.listingService.getFavorites().subscribe((response: any) => {
      this.vehicles = response.array;
    });
  }
}
