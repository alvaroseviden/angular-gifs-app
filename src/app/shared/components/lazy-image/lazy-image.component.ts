import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})
export class LazyImageComponent implements OnInit {


  @Input()
  public url!: string;

  @Input()
  public alt: string = ''; //Asi no lo hacemos obligatorio


  //Para saber cuando se ha cargado la imagen y hay que dejar de mostrar el svg loader
  public hasLoaded: boolean = false;


  ngOnInit(): void {

    if ( !this.url ) {
      throw new Error('Url propiedad es requerida.');
    }

  }

//Creo metodo para que cuand ose carge la imagen, ponga la ander a true
  onLoad() {

    setTimeout(() => {
      console.log('Image loaded');
      this.hasLoaded = true;
    }, 1000 );

  }

}
