import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  //Inyectamos el servicio e el home page para reutilizar todo, y hacer que recupere los gifs
  //obtenidos desde la brra de busqueda search box
  // Desde aqui, el home page, se lo pasaremos al card-list
  constructor( private gifsService: GifsService ) {}


  get gifs(): Gif[] {
    return this.gifsService.gifList;
  }

}
