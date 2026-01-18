export interface Article {
  id: string;
  title: string;
  journal: string;
  publication_date: string;
  doi: string;
  author_display?: string[];
  abstract?: string;
}

export interface PlosSearchResponse {
  response: {
    numFound: number;
    start: number;
    docs: any[];
  };
}
