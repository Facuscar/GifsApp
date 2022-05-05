import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'pPedexad1iKYVADugAqoVLMCeVT1br0z';
  private _searchHistory: string[] = [];
  private limit: number = 20;

  public results: any[] = [];

  get searchHistory(): string[] {
    return [...this._searchHistory];
  }

  constructor( private http: HttpClient ) {}

  searchGifs( query: string ): void {
    if(query.trim().length > 0){
      if(this._searchHistory.length == 10){
        this._searchHistory.pop();
      } 
  
      let index = this._searchHistory.findIndex(search => query.toLowerCase() === search.toLowerCase());
  
      if(index  != -1){
  
      } else{
        this._searchHistory.unshift( query );
      }
    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=${this.limit}`).subscribe( (result: any) => {
        this.results = result.data;
    });
  }
}
