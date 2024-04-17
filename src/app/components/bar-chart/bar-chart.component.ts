import { Component, Input, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { GestionApiService } from 'src/app/services/gestion-api.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {

  //Estos 3 inputs las recibimos desde tab3.page.html y se declaran en tab3.page.ts
  @Input() nombresCategorias: string[] = [];
  @Input() backgroundColorCategorias: string[] = [];
  @Input() borderColorCategorias: string[] = [];

  // Inicializamos el chart, como puede ser undefined le ponemos !
  public chart!: Chart;

  //Declaramos la estructura que queremos que tenga nuestro json, recibirá los datos desde la api
  public apiData: { categoria: string; totalResults: number }[] = [];

  //Declaramos el servicio junto a ElementRef y Renderer2 para crear el canvas automáticamente
  constructor(public gestionServiceApi: GestionApiService, private elementRef: ElementRef, private renderer: Renderer2) {}

  //Se ejecutará la primera vez que se cargue la página y cuando se cambia de segmentos. Esto es así, porque el gráfico se destruye al cambiar de segmentos y se crea nuevamente.
  ngOnInit(): void {
    console.log("Ejecuta bar-chart");
    // Inicializa el gráfico
    this.inicializarChart();

    //Nos suscribimos al observable de tipo BehaviorSubject y cuando este emita un valor, recibiremos una notificación con el nuevo valor.
    this.gestionServiceApi.datos$.subscribe((datos) => {
      if (datos != undefined) {
        this.actualizarValoresChart(datos.categoria, datos.totalResults);
        this.actualizarChart();
      }
    });
  }

  //Cuando salgamos del segmento se destruirá el gráfico
  /*ngOnDestroy() {
    this.destroyChart();
  }*/

  //Método que actualiza los valores de la gráfica teniendo como referencia cada categoria
  public actualizarValoresChart(categoria: string, totalResults: number) {
    const existingData = this.apiData.find(item => item.categoria === categoria);

    if (existingData) {
      // Si ya existe una entrada para esta categoría, actualiza el valor
      existingData.totalResults = totalResults;
    } else {
      // Si no existe, agrega una nueva entrada
      this.apiData.push({ categoria, totalResults });
    }
  }

  //Método que actualiza la gráfica, le asigna los labels (leyendas), colores y valores
  public actualizarChart() {
    // Actualiza solo los datos del gráfico sin volver a crearlo
    const datasetsByCompany: { [key: string]: { label: string; data: number[]; backgroundColor: string[]; borderColor: string[]; borderWidth: number } } = {};

    this.apiData.forEach((row: { categoria: string; totalResults: number }, index: number) => {
      const { categoria, totalResults } = row;

      if (!datasetsByCompany[categoria]) {
        datasetsByCompany[categoria] = {
          label: 'Valores de ' + categoria,
          data: [],
          backgroundColor: [this.backgroundColorCategorias[index]],
          borderColor: [this.borderColorCategorias[index]],
          borderWidth: 1
        };
      }

      datasetsByCompany[categoria].data[index] = totalResults;
      datasetsByCompany[categoria].backgroundColor[index] = this.backgroundColorCategorias[index];
      datasetsByCompany[categoria].borderColor[index] = this.borderColorCategorias[index];
    });

    // Actualiza los datos del gráfico
    this.chart.data.labels = this.apiData.map((row: { categoria: string; totalResults: number }) => row.categoria);
    this.chart.data.datasets = Object.values(datasetsByCompany);
    // Actualiza el gráfico
    this.chart.update(); 
  }

  //Método que crea la estructura inicial del gráfico y crea el canvas automático
  private inicializarChart() {
    // Destruir el gráfico existente si existe
    //this.destroyChart();
  
    // Declaramos el objeto para almacenar los datasets por categoría
    const datasetsByCompany: { [key: string]:
      {
        label: string;
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;
      } 
    } = {};
  
    // Si el gráfico no está inicializado, entonces la creamos sin datos ni colores
    if (!this.chart) {
      this.apiData.forEach((row: { categoria: string; totalResults: number }, index: number) => {
        const { categoria, totalResults } = row;
  
        if (!datasetsByCompany[categoria]) {
          datasetsByCompany[categoria] = {
            label: 'Valores de ' + categoria,
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
          };
        }
      });
  
      //Formateamos el objeto para que nos guarde en formato array de json [{},{}]
      const datasets = Object.values(datasetsByCompany);

      // Creamos la gráfica (canvas)
      const canvas = this.renderer.createElement('canvas');
      //Le añadimos una id al canvas
      this.renderer.setAttribute(canvas, 'id', 'bar-chart');
    
      // Añadimos el canvas al div con id "contenedor-barchart"
      const container = this.elementRef.nativeElement.querySelector('#contenedor-barchart');
      //Añadimos el canvas al container
      this.renderer.appendChild(container, canvas);
  
      //Creamos el nuevo chart con el canvas que hemos creado
      //labels: Serán los valores que se muestran en la leyenda
      /*Cada datasets tendrá los siguientes datos:
        label: 'Valores de ' + categoria,
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1
       */
      this.chart = new Chart(canvas, {
        type: 'bar' as ChartType,
        data: {
          labels: this.apiData.map((row: { categoria: string; totalResults: number }) => row.categoria),
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 16,
                  weight: 'bold',
                },
              },
            }
          },
        }
      });
    } else {
      // Si el gráfico ya está inicializado, actualiza solo los datos
      this.chart.data.labels = this.apiData.map((row: { categoria: string; totalResults: number }) => row.categoria);
      this.chart.data.datasets = Object.values(datasetsByCompany);
      // Actualiza el gráfico con los nuevos datos
      this.chart.update();
    }
    //Importante añadirle el ancho y alto al canvas
    this.chart.canvas.width = 100;
    this.chart.canvas.height = 100;
  }
  

  getChartImage(): string {
    // Obtener la representación de imagen base64 de la gráfica
    const base64Image = this.chart.toBase64Image();
    return base64Image;
  }

}
