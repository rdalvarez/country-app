import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';


  public cacheStore: CacheStore = {
    byCapital: {term: '', countries: [] },
    byCountries: {term: '', countries: [] },
    byRegion: {region: '', countries: [] },

  }

  constructor(private http: HttpClient) {
    console.log('Country Service Ready!');
  }

  private getCountriesTequest( url: string): Observable<Country[]>{
    return this.http.get<Country[]>( url )
      .pipe(
        catchError(() => of([])),
        //delay( 2000 ),
      );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }

  searchByCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`
    return this.getCountriesTequest(url);
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesTequest(url);
  }

  searchRegion(region: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesTequest(url);
  }

}
