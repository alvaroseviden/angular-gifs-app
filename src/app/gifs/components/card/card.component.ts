import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {


 //Nedesito poder recibir un gif de tipo Gif
 //Para eso creo un elemento de ese tipo
 // Es un imput porque es un listener que en cuant oreciba un elemento, se debe lanzar
 @Input()
  public gif!: Gif;


  ngOnInit(): void {

    if ( !this.gif ) {
      throw new Error('Propiedad gif es requerida.');
    }
    //throw new Error('Method not implemented.');
  }



}
