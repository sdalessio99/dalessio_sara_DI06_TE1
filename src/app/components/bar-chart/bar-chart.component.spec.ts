import { GestionApiService } from './../../services/gestion-api.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BarChartComponent } from './bar-chart.component';
//import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BarChartComponent', () => {
  let component: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;
  //let gestionApiService: GestionApiService;
  let mockApiData: {categoria: string, totalResults: number}[]=[];

  // Declara un BehaviorSubject falso para usar en las pruebas
  const fakeSubject = new BehaviorSubject<{ categoria: string; totalResults: number; }>({ categoria: 'general', totalResults: 0 });

  const mockGestionService: {
    cargarCategoria: (categoria: string) => void;
  } = {
    cargarCategoria: (categoria: string) => {}
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BarChartComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [
        {
          provide: GestionApiService,
          useValue: {datos$: fakeSubject, mockGestionService}
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BarChartComponent);
    component = fixture.componentInstance;
    //gestionApiService = TestBed.inject(GestionApiService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Comprobamos si podemos ejecutar el método ngOnInit
  //No se ejecuta la lógica del ngOnInit
  it('Se puede ejecutar ngOnInit', () => {
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  //Comprobamos si podemos ejecutar el método ngOnInit
  //Se ejecuta la lógica de ngOnInit
  it('El método ngOnInit se ejecuta correctamente', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('Comprobamos si podemos llamar a actualizarValoresChart y actualizarChart', () => {
    const mockData = { categoria: 'sports', totalResults: 10 }; 

    spyOn(component, 'actualizarValoresChart');
    spyOn(component, 'actualizarChart');

    fakeSubject.next(mockData);

    // Verificar si el método actualizarValoresChart se puede llamar con los parámetros correctos
    expect(component.actualizarValoresChart).toHaveBeenCalledWith(mockData.categoria, mockData.totalResults);
    // Verificar si el método actualizarChart se puede llamar
    expect(component.actualizarChart).toHaveBeenCalled();
  });

  it('Comprobamos si podemos ejecutar actualizarValoresChart', () => {
    // Configurar el mock de apiData en el componente-
    //Si lo utilizamos en más de un método, la podemos añadir dentro de beforeEach
    mockApiData = [
      {categoria: "sports", totalResults: 60},
      {categoria: "business", totalResults: 50},
      {categoria: "technology", totalResults: 40},
      {categoria: "health", totalResults: 30},
    ];
    component.apiData = mockApiData;

    // Ejecutar la lógica del método actualizarValoresChart con datos de prueba
    const mockData = { categoria: 'general', totalResults: 15 };
    component.actualizarValoresChart(mockData.categoria, mockData.totalResults);

    // Verificar si los valores se han actualizado correctamente
    const updatedData = component.apiData.find(item => item.categoria === mockData.categoria);
    // Nos aseguramos de que updateData esté definido, es decir, que se haya encontrado el dato actualizado.
    // updateData = { categoria: 'general', totalResults: 15 }
    expect(updatedData).toBeDefined();
    // Comprobamos que totalResults se ha actualizado correctamente
    expect(updatedData!.totalResults).toBe(mockData.totalResults);
  });
});
