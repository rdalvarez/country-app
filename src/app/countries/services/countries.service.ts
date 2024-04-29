import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import { Country, Name } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {
    console.log('Country Service Ready!');
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }

  searchByCapital(term: string): Observable<Country[]> {
    return this.search(`capital/${term}`);
  }

  searchCountry(term: string): Observable<Country[]> {
    return this.search(`name/${term}`);
  }

  searchRegion(region: string): Observable<Country[]> {
    return this.search(`region/${region}`);
  }

  private search(term: string): Observable<Country[]> {
   const url = `${this.apiUrl}/${term}`;
    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }

}
