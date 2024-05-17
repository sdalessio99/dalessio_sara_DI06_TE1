import { TestBed } from '@angular/core/testing';
import { GestionApiService } from './gestion-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RespuestaNoticias } from '../interfaces/interfaces';

describe('GestionApiService', () => {
  // Inicializaremos el servicio
  let service: GestionApiService;

  // Necesitaremos un mock para sustituir el HttpCliente
  let httpMock: HttpTestingController;

  // Habrá que import los modulos necesarios, como por ejemplo para simular HttpClient
  beforeEach(() => {
    TestBed.configureTestingModule({
      // importamos el httpClienteTestingModule (OJO, no importamos httpClient)
      imports:[HttpClientTestingModule],

      // En providers añadilos el servicio que vamos a utilizar
      providers: [GestionApiService]
    });

    // Inyectamos el servicio al TestBed
    service = TestBed.inject(GestionApiService);

    // Inyectamos el httpTestingController al TestBed
    httpMock = TestBed.inject(HttpTestingController);

  });

  // afterEach, verificamos httpMock que no queden respuestas pendientes
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Simulamos sin ejecutar la lógica a ver si podemos llamar al método cargarCategoria
  it("Comprobar si podemos llamar al método cargarCategoria", () => {
    spyOn(service, 'cargarCategoria');
    service.cargarCategoria('business');
    expect(service.cargarCategoria).toHaveBeenCalledWith('business');
  });

  // Cargar datos en el BehaviorSubject correctamente simulando la respuesta del servidor y usando la logica del metodo cargarCategoria
  it('Debería cargar los datos en el BehaviorSubject correctamente', () => {
    const categoria = 'business';

    // Necesitaremos un mock de tipo RespuestasNoticias para simular la respuesta del servidor
    const mockResponse: RespuestaNoticias = {
      // Simular respuesta del servidor como ok
      status: 'ok',

      // Simular cantidad de articulos recibidos como 2
      totalResults: 2,

      // Contenido de los articulos
      articles: [
        {
          source: {
            id: '111',
            name: 'Ejemplo1'
          },
          author: 'Autor1',
          title: 'Titulo1',
          description: 'Descripcion1',
          url: 'https://www.ejemplo.com',
          urlToImage: 'https://wwww.ejemplo.com/image.jpg',
          publishedAt: '2024-03-11T04:45:29Z',
          content: 'Contenido1'
        },
        {
          source: {
            id: '222',
            name: 'Ejemplo2'
          },
          author: 'Autor2',
          title: 'Titulo2',
          description: 'Descripcion2',
          url: 'https://www.ejemplo.com',
          urlToImage: 'https://wwww.ejemplo.com/image.jpg',
          publishedAt: '2024-03-11T04:45:29Z',
          content: 'Contenido2'
        }
      ]
    }

    // Ejecutamos la lógica de cargarCategoria para testear que el BehaviorSuject funciona correctamente
    service.cargarCategoria(categoria);

    // Simulamos una llamada API y esperamos una respuesta y que sea de tipo GET
    // Recordar que hacemos uso de HttpTestingController, no de httpClient, por tanto, estamos simulando la llamada API.
    // Necesitaremos apiKey de cada uno.
    // IMPORTANTE MODIFICAR EL APIKEY EN LA CARPETA ENVIRONMENTS
    const req = httpMock.expectOne("https://newsapi.org/v2/top-headlines?country=us&category="+categoria+"&apiKey="+service.apiKey);

    // Simulamos que la respuesta del servidor sea nuestro mockResponse (flush)
    req.flush(mockResponse);

    // datos$ tendría que modificarse con los datos simulados (categoria=business y totalResults=2), por tanto data contendrá esos datos.
    // Aquí habrá que hacer el subscribe de datos$, y comprobaremos que data esté definido y que data.categoria y data.totalResults son iguales a nuestra categoria y totalResults
    service.datos$.subscribe(data => {
      expect(data).toBeDefined();
      expect(data?.categoria).toBe(categoria);
      expect(data?.totalResults).toBe(mockResponse.totalResults);
    })
  });
});