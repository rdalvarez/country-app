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
  public term: string = ''

  constructor(private countriesService: CountriesService) {
    this.loadLocalStorage();
  }

  searchByRegion(term: string) {
    this.saveLocalStorage(term);
    this.countriesService.searchRegion(term)
    .subscribe((countries) => {
      this.countries = countries;
    });
  }

  saveLocalStorage(term: string){
    localStorage.setItem('historyByRegion', term);
  }

  loadLocalStorage(){
    if (!localStorage.getItem('historyByRegion')) return;
    const term = localStorage.getItem('historyByRegion')! || '';
    if (term === '') return;
    this.searchByRegion(term);
    this.term = term;
  }
}
