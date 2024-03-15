import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.scss'
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public regions: Region[] = ['Africa','Americas','Asia','Europe','Oceania'];
  public selectedRegion?: Region;
  public isLoading: boolean = false;

  constructor(
    private countriesService: CountriesService
  ) {}

  searchByRegion( region: Region ) {

    this.isLoading = true;
    this.selectedRegion = region;

    this.countriesService.searchRegion( region )
      .subscribe( (countries) => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    if ( this.countriesService.cacheStore.byRegion.region != '' ) {
      this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
    }
  }
}
