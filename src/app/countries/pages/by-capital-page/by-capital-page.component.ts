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

  constructor(private countriesService: CountriesService) {
    this.loadLocalStorage();
  }

  searchByCapital(term: string) {
    this.countriesService.searchByCapital(term)
    .subscribe((countries) => {
      this.countries = countries;
      this.saveLocalStorage(countries)
    });
  }

  saveLocalStorage(data: Country[]){
    localStorage.setItem('historyByCapital', JSON.stringify(data));
  }

  loadLocalStorage(){
    if (!localStorage.getItem('historyByCapital')) return;
    this.countries = JSON.parse(localStorage.getItem('historyByCapital')!) || [];
  }

}
