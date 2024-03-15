import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.scss'
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(
    private countriesService: CountriesService
  ) {}

  searchByCountry( term: string ) {

    this.isLoading = true;

    this.countriesService.searchCountry( term )
      .subscribe( (countries) => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }
}
