import { Component } from '@angular/core';
import { PlosService } from './services/plos.service';
import { Article } from './models/article.model';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchQuery: string = '';
  articles: Article[] = [];
  loading: boolean = false;
  error: string = '';
  
  // Paginación
  currentPage: number = 1;
  pageSize: number = 10;
  totalResults: number = 0;
  pageSizeOptions: number[] = [5, 10, 20, 50];

  constructor(private plosService: PlosService) { }

  search(): void {
    if (!this.searchQuery.trim()) {
      this.error = 'Por favor ingresa un término de búsqueda';
      return;
    }

    this.loading = true;
    this.error = '';
    this.currentPage = 1;

    this.loadArticles();
  }

  loadArticles(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    
    this.plosService.searchArticles(this.searchQuery, start, this.pageSize)
      .subscribe({
        next: (result) => {
          this.articles = result.articles;
          this.totalResults = result.total;
          this.loading = false;
          
          if (this.articles.length === 0) {
            this.error = 'No se encontraron artículos con ese término de búsqueda';
          }
        },
        error: (err) => {
          this.loading = false;
          this.error = 'Error al buscar artículos. Por favor intenta de nuevo.';
          console.error('Error:', err);
        }
      });
  }

  // Paginación
  get totalPages(): number {
    return Math.ceil(this.totalResults / this.pageSize);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loading = true;
      this.loadArticles();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.loading = true;
    this.loadArticles();
  }

  getArticleNumber(index: number): number {
    return (this.currentPage - 1) * this.pageSize + index + 1;
  }

  getDOIUrl(doi: string): string {
    return this.plosService.getDOIUrl(doi);
  }

  // Generar números de página para mostrar
  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    // Ajustar si estamos cerca del final
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  shouldShowFirstPage(): boolean {
    return this.currentPage > 3;
  }

  shouldShowLastPage(): boolean {
    return this.currentPage < this.totalPages - 2;
  }

  // Exportar a CSV
  exportToCSV(): void {
    if (this.articles.length === 0) {
      alert('No hay artículos para exportar');
      return;
    }

    const headers = ['#', 'Título', 'Journal', 'Fecha', 'DOI'];
    const csvContent = [
      headers.join(','),
      ...this.articles.map((article, index) => {
        const articleNumber = this.getArticleNumber(index);
        const row = [
          articleNumber,
          `"${article.title.replace(/"/g, '""')}"`,
          `"${article.journal.replace(/"/g, '""')}"`,
          article.publication_date,
          article.doi
        ];
        return row.join(',');
      })
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `plos_articles_${this.searchQuery}_page${this.currentPage}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Exportar a PDF
  exportToPDF(): void {
    if (this.articles.length === 0) {
      alert('No hay artículos para exportar');
      return;
    }

    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(18);
    doc.text('PLOS - Resultados de Búsqueda', 14, 22);
    
    doc.setFontSize(12);
    doc.text(`Término: ${this.searchQuery}`, 14, 32);
    doc.text(`Página: ${this.currentPage} de ${this.totalPages}`, 14, 40);
    doc.text(`Total de resultados: ${this.totalResults}`, 14, 48);

    // Tabla
    const tableData = this.articles.map((article, index) => [
      this.getArticleNumber(index).toString(),
      article.title,
      article.journal,
      article.publication_date,
      article.doi
    ]);

    autoTable(doc, {
      head: [['#', 'Título', 'Journal', 'Fecha', 'DOI']],
      body: tableData,
      startY: 55,
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: [102, 126, 234], textColor: 255 },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 70 },
        2: { cellWidth: 35 },
        3: { cellWidth: 30 },
        4: { cellWidth: 40 }
      },
      margin: { top: 55 }
    });

    doc.save(`plos_articles_${this.searchQuery}_page${this.currentPage}.pdf`);
  }
}
