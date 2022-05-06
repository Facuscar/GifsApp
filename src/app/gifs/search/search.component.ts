import { Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @ViewChild('searchTxt') searchTxt!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService ) {

  }

  search(): void {
    const value = this.searchTxt.nativeElement.value
    this.gifsService.searchGifs( value );
    this.searchTxt.nativeElement.value = '' ; 
  }
}
