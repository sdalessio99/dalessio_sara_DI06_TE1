import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RespuestaNoticias } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GestionApiService {

  apiKey: string = environment.apiKey;
  apiUrl: string = environment.apiUrl;

  // Hacemos uso de BehaviorSubject tipo json (categoria y totalResults o undefined).
  // BehaviorSubject es un tipo especial de Observable que siempre tiene un valor actual y emite ese valor inmediatamente a los nuevos suscriptores. En este caso,
  // emite objetos de tipo "{ categoria: string; totalResults: number } | undefined"
  private datosSubject: BehaviorSubject<{ categoria: string; totalResults: number }|undefined> = new BehaviorSubject<{ categoria: string; totalResults: number }|undefined>(undefined);
  // Creamos el observable datos$ para gestionar los cambios que vienen desde la api.
  public datos$: Observable<{ categoria: string; totalResults: number }|undefined> = this.datosSubject.asObservable();

  constructor(private leerArticulosServicioHttp: HttpClient) { }

  public cargarCategoria(categoria: string) {
    // Realizamos la llamada api y la recogemos en un observable de tipo RespuestaNoticias
    let respuesta: Observable<RespuestaNoticias> = this.leerArticulosServicioHttp.get<RespuestaNoticias>("https://newsapi.org/v2/top-headlines?country=us&category=" + categoria + "&apiKey=" + this.apiKey);
    console.log("respuesta: "+respuesta);
    respuesta.subscribe( data => {
      if (data && data.totalResults !== undefined) {
        // Mediante datosSubject.next, avisamos a todos los suscriptores (en este caso datos$) de que hemos recibido un nuevo valor.
        this.datosSubject.next({ categoria: categoria, totalResults: data.totalResults });
      } else {
        console.error('La propiedad totalResults no está definida en la respuesta:', data);
      }
    });
  }
}