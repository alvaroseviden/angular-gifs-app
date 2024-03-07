import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';


@Injectable({providedIn: 'root'})
export class GifsService {

// Al obtener el objeto de respuesta de un WS
// Generalemente los vamos a meter en una clase, que puede tenre ya mas atributos para ponerlo de la forma que nosotros queramos
//Para esto, entonces hacemos una clase
//Esto sirve para almacenar los gifs que obtenemos
  public gifList: Gif[] = [];


  private _tagsHistory: string[] = [];
  private apiKey: string = 'Qxwn3MN4rAstKQNMUVPF7rEgPPybdP7N';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

// Después de importar el HttpClientModule en el app.module, podemos inyectar en el constructor el service de Http
  constructor( private http: HttpClient ) {

    // Solo voy a recuperar una vez la info del LocalStorage, la primera vez que se cargue el ws
    this.loadLocalStorage();
    console.log('Gifs Service Ready');

   }


//Se hace private para que nadie haga cambios fuera de este service y angular no lo detecte

//Javascript, a pesar del private, lo pasa por referencia
//Para romper ese enlace de javascript y que no se pueda manipular, ponemos lo de [...]
  get tagsHistory() {
    return [...this._tagsHistory];
  }


  private organizeHistory( tag: string ) {

    //Queremos almacenarlo en minuscula, aunque luego visualmente se vea de otra manera
    tag = tag.toLowerCase();
    //Vamos a filtrar las búsquedas que ya se hayan realizado previamente
    // Lo que hacemos es quitar el lemento coincidiente
    if (this._tagsHistory.includes(tag)) {
      //Deuvleve un arreglo sin el elemento que coincida
      // EL elemento original del array; oldtag, y lo comparamos con  ltag metido por teclado
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag );

    }
    //Volvemos a añadir el elemento al principio para que se vea el primero
    this._tagsHistory.unshift( tag );


    //Limitamos el numero de busquedas a 10
    this._tagsHistory = this._tagsHistory.splice(0,10);


    //Guardamos el historial en LocalStorage
    this.saveLocalStorage();

  }


  private saveLocalStorage(): void {
    // Para guardar en Local Storage del navegador, usamos el elemento localStorage.
    //Este elemento no hace falta importarlo, ya existe en el script
    //Intento guardar el historial, pero el historial es un arregl ode strings, y solo se pueden guardar string a secas
    //Hay que serializar el array de strings
    //Para serializar un array de strings es un string, usamos JSON.stringify    --> Convierte el array que tiene en un string con el formato del array de strings
    //JSON.stringify ({a:1, b:2})      --> '{"a":1,"b":2}'
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }


  private loadLocalStorage(): void {
    // Si esto es nulo, es false y no devuelve nada
    if (!localStorage.getItem('history')) return;
    //Si tenemos data, no es nulo,seguimos
    // Al no ser nulo, podemos cargar nuestro tagHistory del service con el LocalStorage
    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );
    //NOTA: le tengo que poner al final el simbolo de no nulo ! para indicar que lo que llega no va a ser nulo
    // para que no marque error


    //Valido que no esté vacio por si alguien lo hubiera borrado todo
    if ( this._tagsHistory.length === 0 ) return;

    //Ahora hago la búsqueda automatica del primer elemento del tagHistory
    this.searchTag(this._tagsHistory[0]);


    //localStorage.getItem('history');

  }


  //async searchTag( tag: string ): Promise<void> {
    searchTag( tag: string ): void {
    //Inserta el elemento al principio del array
    //Al usar el roganizador, esto ya no hace falta
    //this._tagsHistory.unshift( tag );

    //Obliga a meter al menos un caracter e la busqueda
    if ( tag.length === 0 ) return;

    //Usa el metodo organiizador
    this.organizeHistory(tag);


    //Vamos a llamar a la URL de obtener giks de GIPHY
    //fetch('https://api.giphy.com/v1/gifs/search?api_key=Qxwn3MN4rAstKQNMUVPF7rEgPPybdP7N&q=valorant&limit=10')
    //.then( resp => resp.json() )
    //.then( data => console.log(data) )

    //otra forma
    //const resp = fetch('https://api.giphy.com/v1/gifs/search?api_key=Qxwn3MN4rAstKQNMUVPF7rEgPPybdP7N&q=valorant&limit=10');
    ///const data = (await resp).json();

    //Lo de fect se puede usar ,es de angular
    // Pero generalmente lo mejor es unsar interceptores
    // usamos HttpClientModule, qe lo importamos en el app.module, porque es algo que vamos a usar
    // en todas partes


    // EVO: Uso parametros para generar los parametros de entrada y no mandarlos en la URL
    //Así, la URL en el http.get solo tendrá la url
      const params = new HttpParams()
      .set('api_key', this.apiKey )
      .set('limit', '10')
      .set('q', tag )



    //Haceos un get con el service http
    //Usamos un observable, que es basicvamente escuchar una respuesta, que lo hacemos con subscribe
    //this.http.get('https://api.giphy.com/v1/gifs/search?api_key=Qxwn3MN4rAstKQNMUVPF7rEgPPybdP7N&q=valorant&limit=10')
    //this.http.get(`${ this.serviceUrl }/search?api_key=Qxwn3MN4rAstKQNMUVPF7rEgPPybdP7N&q=valorant&limit=10`)
    // Al haber obtenido el interface Searchresponse del WS, lo declaramos ocmo respuesta de get
    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`,{ params })
    .subscribe( resp => {


      this.gifList = resp.data;
      //Muestra el array de gifs
      console.log( { gifs: this.gifList} );

    }) ;


    //console.log(this.tagsHistory);

  }

}
