export interface RespuestaNoticias {
    //map(arg0: (item: any) => any): unknown;
    status: string;
    totalResults: number;
    articles: Article[];
  }

export  interface Article {
    source: Source;
    author?: string;
    title: string;
    description?: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
    content?: string;
  }

  interface Source {
    id?: string;
    name: string;
  }