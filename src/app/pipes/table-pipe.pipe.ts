import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tablePipe'
})
export class TablePipePipe implements PipeTransform {

  transform(array: any[], chunkSize: number): any[][] {
    if (!array || !Array.isArray(array) || chunkSize <= 0) {
      return [];
    }

    const chunks = [];
    let i = 0;
    while (i < array.length) {
      if (i + chunkSize >= array.length) {
        // Si quedan menos elementos que el tamaño del chunk, ajustamos el tamaño del último chunk
        chunks.push(array.slice(i));
      } else {
        chunks.push(array.slice(i, i + chunkSize));
      }
      i += chunkSize;
    }
    return chunks;
  }

}
