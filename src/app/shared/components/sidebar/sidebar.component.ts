import { Component} from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {



  // private service

  // private gifsService

  //Vamos a necesitar algun tipo de propiedad publica que el html pueda ver


  //Para usar un service, tenemos que inyectarlo en el constructor
  constructor( private gifsService: GifsService ) { }

  // Este get lo tengo que hacer porque al hacer el service privado, no lo puedo usar en el html
  // Tengo que hacer un get del contenido del history de lwebservice para coger la info
  get tags(): string[] {

    return this.gifsService.tagsHistory;
  }

    //Metodo que vuelve a llamar al ws de gif al apretar e lboton del sidebar en un nombe para volver a buscar
  searchTag( tag:string ):void {

      this.gifsService.searchTag(tag);
  }

}
