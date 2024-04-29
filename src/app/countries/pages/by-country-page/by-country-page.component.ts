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
  public term: string = '';

  constructor(private countriesService: CountriesService) {
    this.loadLocalStorage();
  }

  searchByCountry(term: string) {
    this.saveLocalStorage(term);
    this.countriesService.searchCountry(term).subscribe((countries) => {
      this.countries = countries;
    });
  }

  saveLocalStorage(term: string) {
    localStorage.setItem('historyByCountry', term);
  }

  loadLocalStorage() {
    if (!localStorage.getItem('historyByCountry')) return;
    const term = localStorage.getItem('historyByCountry')! || '';
    if (term === '') return;
    this.searchByCountry(term);
    this.term = term;
  }
}
