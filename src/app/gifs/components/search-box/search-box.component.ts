

import { Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../../services/gifs.service';

//#txtTagInput sirve para definir por variable el elemento que lo tiene. Se ve en todo el template
//(keyup.enter)  --> Para cuando levantes de pulsar enter

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    >

  `
})

export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  //Para usar un service, tenemos que inyectarlo en el constructor
  constructor( private gifsService: GifsService ) { }


  //searchTag (newTag: string ) {
  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    //Despues de inyectarlo en el constructor, lo utilozo para usar el metodo searTag para guardar la busqueda
    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';

    console.log({newTag});

  }

}
