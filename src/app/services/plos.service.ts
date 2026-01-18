import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article, PlosSearchResponse } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class PlosService {
  private apiUrl = 'https://api.plos.org/search';

  constructor(private http: HttpClient) { }

  searchArticles(query: string, start: number = 0, rows: number = 10): Observable<{ articles: Article[], total: number }> {
    const params = new HttpParams()
      .set('q', `title:${query}`)
      .set('start', start.toString())
      .set('rows', rows.toString())
      .set('wt', 'json')
      .set('fl', 'id,title,journal,publication_date,author_display,abstract');

    return this.http.get<PlosSearchResponse>(this.apiUrl, { params }).pipe(
      map(response => {
        const articles: Article[] = response.response.docs.map((doc: any) => ({
          id: doc.id || '',
          title: doc.title || 'Sin título',
          journal: doc.journal || 'N/A',
          publication_date: doc.publication_date ? this.formatDate(doc.publication_date) : 'N/A',
          doi: doc.id || '',
          author_display: doc.author_display || [],
          abstract: doc.abstract ? doc.abstract[0] : ''
        }));

        return {
          articles: articles,
          total: response.response.numFound
        };
      })
    );
  }

  private formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  }

  getDOIUrl(doi: string): string {
    return `https://doi.org/${doi}`;
  }
}
