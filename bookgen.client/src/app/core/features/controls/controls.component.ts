import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './controls.component.html'
})
export class ControlsComponent {
  @Output() paramsChanged = new EventEmitter<{
    region: string;
    seed: number;
    likes: number;
    reviews: number;
  }>();

  region = 'en_US';
  seed = 123;
  likes = 5;
  reviews = 5;
  supportedLocales?: { code: string; name: string; }[];
  
  constructor(private bookService: BookService) {
    
    this.bookService.getLocals()
      .pipe(
        catchError(err => {
          console.error('Error loading locales', err);
          return [];
        })
      )
      .subscribe(locales => {
        this.supportedLocales = locales;
      });
  }

  emitChanges() {
    this.paramsChanged.emit({
      region: this.region,
      seed: this.seed,
      likes: this.likes,
      reviews: this.reviews
    });
  }
}
