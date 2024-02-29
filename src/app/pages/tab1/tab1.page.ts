import { environment } from 'src/environments/environment';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GestionApiService } from 'src/app/services/gestion-api.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  datosTablaTab1 = [
    { nombre: 'Juan', apellido: 'garcia', pais: "españa", edad: 30 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'Pedro', apellido: 'ruiz', pais: "españa", edad: 40 },
    { nombre: 'Juan', apellido: 'garcia', pais: "españa", edad: 30 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'Pedro', apellido: 'ruiz', pais: "españa", edad: 40 },
    { nombre: 'Juan', apellido: 'garcia', pais: "españa", edad: 30 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: "portugal", edad: 25 },
    { nombre: 'Pedro', apellido: 'ruiz', pais: "españa", edad: 40 }
  ];

  datosLista = [
    "Esta será la línea 1 de la lista, vamos a poner un texto muy largo para ver qué es lo que hace en estos casos y como podemos corregirlo",
    "Esta será la línea 2 de la lista, será más corta que la anterior, pero entrará bastante justo en el ancho A4.",
    "Esta será la línea 3 de la lista, este entra bien",
    "Esta será la línea 4 de la lista, este entra bien",
    "Esta será la línea 5 de la lista, este entra bien",
    "Esta será la línea 6 de la lista, este entra bien",
    "Esta será la línea 7 de la lista, este entra bien",
    "Esta será la línea 8 de la lista, este entra bien",
    "Esta será la línea 9 de la lista, este entra bien",
    "Esta será la línea 10 de la lista, este entra bien",
    "Esta será la línea 11 de la lista, este entra bien",
    "Esta será la línea 12 de la lista, este entra bien",
    "Esta será la línea 13 de la lista, este entra bien",
    "Esta será la línea 14 de la lista, este entra bien",
    "Esta será la línea 15 de la lista, este entra bien",
    "Esta será la línea 16 de la lista, este entra bien",
    "Esta será la línea 17 de la lista, este entra bien",
    "Esta será la línea 18 de la lista, este entra bien",
    "Esta será la línea 19 de la lista, este entra bien",
    "Esta será la línea 20 de la lista, este entra bien",
  ]

   // Array para la cabecera de las noticias
   categorias: string[] = [
    "business",
    "entertainment",
    "general",
    "technology",
    "health",
    "science",
    "sports"
  ];
  backgroundColorCat: string[] = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)'
  ];

  borderColorCat: string[] =[
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
  ];

  // Atributos para generar la consulta REST
  // Están almacenados en los ficheros de la carpeta enviroments
  apiKey: string = environment.apiKey;
  apiUrl: string = environment.apiUrl;

  /* En el html, añadimos el atributo #container al div padre (será una id única), para luego poder gestionar todo lo que hay dentro de este div.
   * @ViewChield('container'), busca el atributo #container
   * Añadimos !, para decirle que el valor no será ni null ni undefined. En caso contrarío tendríamos que comprobar que if(this.container) antes de 
   * realizar this.container.nativeElement.
   */
  @ViewChild('container') container!: ElementRef;

  constructor(public gestionServiceApi: GestionApiService) {}

  ngOnInit() {
    this.categorias.forEach(categoria => {
      this.gestionServiceApi.cargarCategoria(categoria);
    });
  }

  generarPDF() {
    //Ancho en px de A4
    const anchoMax = 794 //794px; //210mm
    //Alto en px de A4
    const altoMax = 1123;//1123px; //297mm
    const doc = new jsPDF({
      orientation: 'portrait', //Orientación normal 
      unit: 'px', //En este caso como unidades utilizamos mm, pero podríamos poner cm,px,em,pt,...
      //mm -> [210, 297]
      format: [anchoMax,altoMax]
    });

    /* querySelectorAll: Cogemos todos los selectores que tengan class="seccion" y creamos un NodeListOf de HTMLElement.
     * NodeListOf, es un array que contendrá nodos de DOM, en este caso, es un array de HTMLElement.
     */
    const sections = this.container.nativeElement.querySelectorAll('.seccion') as NodeListOf<HTMLElement>;
    // El total de secciones que tenemos en nuestro html
    const totalSections = sections.length;
        
    //Gestionará la sección que estamos analizando
    let currentSectionIndex = 0;
    //Controlará que se hayan creado todas las imagenes antes de crear el PDF. En caso contrario imprimiría un pdf por cada sección.
    let contSections = 0;

    //Gestionará el height de la página actual
    let headerHeight = 55; //Altura del padding que le hemos dado al header
    let footerHeight = 20; //Altura del padding que le hemos dado al footer
    let currentPageHeight = headerHeight;

    /* Realizamos un bucle para todas las secciones.
     * Importante: html2canvas es asíncrono, por tanto, tendremos que realizar el bucle entero y luego html2canvas se encargará de la creación del pdf.
     * En otras palabras, el bucle terminará antes de que html2canvas haya podido terminar de crear los pdf, es decir, realizará tantas peticiones como secciones haya.
     * Cuando html2canvas termine de gestionar todas las peticiones, creará el pdf y lo imprimirá.
     */
    while (currentSectionIndex < totalSections) {
      const section = sections[currentSectionIndex];
      html2canvas(section).then(canvas => {
        const imageData = canvas.toDataURL('image/jpg');
        let width = doc.internal.pageSize.getWidth();
        /* Se calcula el height dependiendo del height del canvas y su relación con el width. 
         * Esto se hace para que la imagen mantenga dimensiones proporcionales según el width de la página.
         * Si el height + header + footer de la imagen tiene una altura mayor que el tamaño máximo del pdf,
         * modificamos el heigth y width para que entre toda la imagen dentro de la página.
         */
        let height = canvas.height * (width / canvas.width);
        /* Con este if comprobamos cuantas imágenes podemos meter en una página.
         * Mientras no se cumpla la condición irá insertando imágenes y si se cumple, crearemos una página nueva.
         */
        if (currentPageHeight + height + footerHeight >= doc.internal.pageSize.getHeight()) {
          //Añadimos una página nueva
          doc.addPage();
          //Si insertamos una página nueva, reiniciamos el currentPageHeight=55px para que empiece a insertar imágenes después de la cabecera.
          currentPageHeight = headerHeight;
        }
        /* Si el height + header + footer de la imagen tiene una altura mayor que el tamaño máximo del pdf,
         * modificamos el heigth y width para que entre toda la imagen dentro de la página.
         * Es la misma condición que el if de arriba, pero esta vez no creamos una página nueva, sino que insertamos la imagen
         * -> o bien ocupando toda la página junto a la cabecera y el footer 
         * -> o insertándo la imagen después de otra imagen hasta llenar la página.
         */
        if(height+currentPageHeight+footerHeight >= doc.internal.pageSize.getHeight()){
          height = altoMax-currentPageHeight-footerHeight;
          width = canvas.width * (height / canvas.height);
          doc.addImage(imageData, 'JPG', 0, headerHeight, width, height);
        } else{
          doc.addImage(imageData, 'JPG', 0, currentPageHeight, width, height);
        }

        //Actualizamos el currentPageHeigth para ver si ppodemos insertar otra imagen en la misma página o no.
        currentPageHeight += height;
        contSections++;
        if (contSections === totalSections) {
          //Al final asignamos el header y footer a todas las páginas
          this.addPageConfig(doc);
          doc.save('dashboard.pdf');
        }
      });
      //Sumamos 1, para que el bucle realice todas las peticiones, una por cada sección
      currentSectionIndex++;
    }
  }

  addPageConfig(doc:jsPDF) {
    for (let i = 1; i <= doc.getNumberOfPages(); i++) {
      // Añadimos la página
      doc.setPage(i);
      this.addPageHeader(doc);
      this.addPageFooter(doc, i);
    }
  }

  addPageHeader(doc:jsPDF){
    // Añadimos el logotipo, sus valores y posición
    const imagen = "/assets/icon/favicon.png";
    const imgWidth = 45; // Ancho de la imagen
    const imgHeight = 45; // Alto de la imagen
    const imgX = doc.internal.pageSize.width/2 - imgWidth/2; // Posición X de la imagen
    const imgY = 5; // Posición Y de la imagen
    // Le asignamos un tamaño a las letras
    doc.setFontSize(10);
    doc.line(0, 55, doc.internal.pageSize.width, 55);
    doc.setFillColor('#CCCCCC');
    doc.rect(10, 5, doc.internal.pageSize.width - 20, 45, 'F');
    doc.addImage(imagen, "JPG", imgX, imgY, imgWidth, imgHeight);

    // Añadimos información de la empresa
    const nombreEmpresa = "Nombre de la Empresa";
    const telefono = "Teléfono: 123-456-789";
    const direccion = "Dirección: Calle Principal, 123";
    const texto = nombreEmpresa+'\n'+telefono+'\n'+direccion;
    doc.text(texto, 20, 10, {baseline:'top'});
  }

  addPageFooter(doc:jsPDF, i:number){
    // Añadimos la paginación
    doc.setFillColor('#CCCCCC');
    doc.rect(10, doc.internal.pageSize.height - 20, doc.internal.pageSize.width - 20, 10, 'F');
    doc.text("Página "+i+" de "+doc.getNumberOfPages(), doc.internal.pageSize.width/2, doc.internal.pageSize.height - 10, {align: 'center',baseline:'bottom'});
  }
}
