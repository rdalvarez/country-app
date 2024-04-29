import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: []
})
export class ByRegionPageComponent {
  public countries: Country[] = [];

  constructor(private countriesService: CountriesService) {
    this.loadLocalStorage();
  }

  searchByRegion(term: string) {
    this.countriesService.searchRegion(term)
    .subscribe((countries) => {
      this.countries = countries;
      this.saveLocalStorage(countries);
    });
  }

  saveLocalStorage(data: Country[]){
    localStorage.setItem('historyByRegion', JSON.stringify(data));
  }

  loadLocalStorage(){
    if (!localStorage.getItem('historyByRegion')) return;
    this.countries = JSON.parse(localStorage.getItem('historyByRegion')!) || [];
  }
}
