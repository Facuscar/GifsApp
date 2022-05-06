import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent  {

  constructor ( private gifsService: GifsService ) {

  }

  get searchHistory(): string [] {
    return this.gifsService.searchHistory
  }

  oldSearch( query: string ): void{
    this.gifsService.searchGifs( query );
  }
}
