import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Book } from '../models/book';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BookService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  
  getLocals(): Observable<{ code: string, name: string }[]> {
    return this.http.get<{ code: string, name: string }[]>(`${this.baseUrl}/locales`);
  }

  getBooks(region: string, seed: number, page: number, likes: number, reviews: number): Observable<Book[]> {
    const body = {
      language: region,
      seed,
      likesAvg: likes,
      reviewsAvg: reviews,
      page
    };

    return this.http.post<any[]>(`${this.baseUrl}/books`, body)
      .pipe(
        map(data => 
          data.map(item => ({
            ...item,
            authors: [item.author]
          }))
        )
      );
  }
}
