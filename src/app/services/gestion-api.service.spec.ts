import { TestBed } from '@angular/core/testing';
import { GestionApiService } from './gestion-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RespuestaNoticias } from '../interfaces/interfaces';

describe('GestionApiService', () => {
  let service: GestionApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      //importamos el httpClienteTestingModule (OJO, no importamos httpClient)
      imports:[HttpClientTestingModule],
      //En providers añadilos el servicio que vamos a utilizar
      providers: [GestionApiService]
    });
    //Inyectamos el servicio al TestBed
    service = TestBed.inject(GestionApiService);
    //Inyectamos el httpTestingController al TestBed
    httpMock = TestBed.inject(HttpTestingController);
  });

  //Verificamos que no queden respuestas pendientes
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("Comprobar si podemos llamar al método cargarCategoria", () => {
    const categoria = "general";
    spyOn(service, 'cargarCategoria');
    service.cargarCategoria(categoria);
    expect(service.cargarCategoria).toHaveBeenCalled();
  });
  

  it('Debería cargar los datos en el BehaviorSubject correctamente', () => {
    const categoria = 'business';
    const mockResponse: RespuestaNoticias = {
      //Simulamos que el servidor haya respondido "ok"
      status: 'ok', 
      //Simulamos que hemos recibido 2 articulos, totalResults = 2
      //Si añadimos más articulos poner la cantidad de articulos aquí 
      totalResults: 2, 
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
        // Otros objetos Article según sea necesario
      ]
    };

    //Ejecutamos la lógica de cargarCategoria para testear que el BehaviorSuject funciona correctamente
    service.cargarCategoria(categoria);

    //Simulamos una llamada API y esperamos una respuesta y que sea de tipo GET
    //Recordar que hacemos uso de HttpTestingController, no de httpClient, por tanto, estamos simulando la llamada API
    const req = httpMock.expectOne("https://newsapi.org/v2/top-headlines?country=us&category="+categoria+"&apiKey="+service.apiKey);
    expect(req.request.method).toBe('GET');

    //Simulamos que la respuesta del servidor sea nuestro mockResponse
    req.flush(mockResponse);

    //datos$ tendría que modificarse con los datos simulados (categoria=business y totalResults=2), por tanto data contendrá esos datos.
    service.datos$.subscribe(data => {
      expect(data).toBeDefined();
      expect(data?.categoria).toBe(categoria);
      expect(data?.totalResults).toBe(mockResponse.totalResults);
    });
  });

  it('Comprobar que si el servicio API devuelve null lo estamos controlando', () => {
    const categoria = 'business';

    service.cargarCategoria(categoria);

    const req = httpMock.expectOne(`https://newsapi.org/v2/top-headlines?country=us&category=${categoria}&apiKey=${service.apiKey}`);
    expect(req.request.method).toBe('GET');

    req.flush(null);

    service.datos$.subscribe(data => {
      expect(data).toBeUndefined();
    });
  });
});
