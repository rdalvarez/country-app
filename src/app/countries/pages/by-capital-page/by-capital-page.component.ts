import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [],
})
export class ByCapitalPageComponent {
  public countries: Country[] = [];
  public term: string = '';

  constructor(private countriesService: CountriesService) {
    this.loadLocalStorage();
  }

  searchByCapital(term: string) {
    this.saveLocalStorage(term);
    this.countriesService.searchByCapital(term)
    .subscribe((countries) => {
      this.countries = countries;
    });
  }

  saveLocalStorage(term: string) {
    localStorage.setItem('historyByCapital', term);
  }

  loadLocalStorage() {
    if (!localStorage.getItem('historyByCapital')) return;
    const term = localStorage.getItem('historyByCapital')! || '';
    if (term === '') return;
    this.searchByCapital(term);
    this.term = term;
  }

}
