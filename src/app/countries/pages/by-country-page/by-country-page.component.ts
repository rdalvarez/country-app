import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [],
})
export class ByCountryPageComponent {
  public countries: Country[] = [];

  constructor(private countriesService: CountriesService) {
    this.loadLocalStorage();
  }

  searchByCountry(term: string) {
    this.countriesService.searchCountry(term).subscribe((countries) => {
      this.countries = countries;
      this.saveLocalStorage(countries)
    });
  }

  saveLocalStorage(data: Country[]){
    localStorage.setItem('historyByCountry', JSON.stringify(data));
  }

  loadLocalStorage(){
    if (!localStorage.getItem('historyByCountry')) return;
    this.countries = JSON.parse(localStorage.getItem('historyByCountry')!) || [];
  }

}
