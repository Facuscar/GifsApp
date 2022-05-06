import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'pPedexad1iKYVADugAqoVLMCeVT1br0z';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private limit: number = 20;
  private _searchHistory: string[] = [];
  

  public results: Gif[] = [];

  get searchHistory(): string[] {
    return [...this._searchHistory];
  }

  constructor( private http: HttpClient ) {
    this.retrieveData();
  }

  searchGifs( query: string ): void {
    if(query.trim().length > 0){
      if(this._searchHistory.length == 10){
        this._searchHistory.pop();
      } 
  
      let index = this._searchHistory.findIndex(search => query.toLowerCase() === search.toLowerCase());
      console.log(index);
  
      if(index  != -1){
        this._searchHistory.splice(index, 1);
      }
      this._searchHistory.unshift(query); 
    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', this.limit.toString())
          .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, {params}).subscribe( (result: any) => {
        this.results = result.data;
        this.saveData();
    });
   
  }

  saveData(): void {
    localStorage.setItem('searchHistory', JSON.stringify(this._searchHistory));
    localStorage.setItem('results', JSON.stringify(this.results));
  }

  retrieveData(){
    if( localStorage.getItem('searchHistory') ) { 
      this._searchHistory = JSON.parse(localStorage.getItem('searchHistory')!) || [];
    }

    if( localStorage.getItem('results') ) {
      this.results = JSON.parse(localStorage.getItem('results')!) || [];
    }
  }
}
