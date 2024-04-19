import { TestBed } from '@angular/core/testing';
import { GestionApiService } from './gestion-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RespuestaNoticias } from '../interfaces/interfaces';

describe('GestionApiService', () => {
  //Inicializaremos el servicio
  let service = GestionApiService;
  //Necesitaremos un mock para sustituir el HttpCliente

  //Habrá que import los modulos necesarios, como por ejemplo para simular HttpClient
  beforeEach(() => {
    TestBed.configureTestingModule({
      //importamos el httpClienteTestingModule (OJO, no importamos httpClient)
      imports:[],
      //En providers añadilos el servicio que vamos a utilizar
      providers: []
    });
    //Inyectamos el servicio al TestBed

    //Inyectamos el httpTestingController al TestBed

  });

  //afterEach, verificamos httpMock que no queden respuestas pendientes
  afterEach(() => {

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //Simulamos sin ejecutar la lógica a ver si podemos llamar al método cargarCategoria
  it("Comprobar si podemos llamar al método cargarCategoria", () => {

  });
  

  //
  it('Debería cargar los datos en el BehaviorSubject correctamente', () => {
    const categoria = 'business';
    //Necesitaremos un mock de tipo RespuestasNoticias para simular la respuesta del servidor 
    const mockResponse;

    //Ejecutamos la lógica de cargarCategoria para testear que el BehaviorSuject funciona correctamente

    //Simulamos una llamada API y esperamos una respuesta y que sea de tipo GET
    //Recordar que hacemos uso de HttpTestingController, no de httpClient, por tanto, estamos simulando la llamada API.
    //Necesitaremos apiKey de cada uno. 
    //IMPORTANTE MODIFICAR EL APIKEY EN LA CARPETA ENVIRONMENTS

    //Simulamos que la respuesta del servidor sea nuestro mockResponse (flush)

    //datos$ tendría que modificarse con los datos simulados (categoria=business y totalResults=2), por tanto data contendrá esos datos.
    //Aquí habrá que hacer el subscribe de datos$, y comprobaremos que data esté definido y que data.categoria y data.totalResults son iguales a nuestra categoria y totalResults

  });
});
