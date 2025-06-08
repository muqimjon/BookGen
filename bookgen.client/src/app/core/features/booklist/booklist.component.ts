import { Component, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.scss']
})
export class BookListComponent implements OnChanges {
  @Input() region!: string;
  @Input() seed!: number;
  @Input() likes!: number;
  @Input() reviews!: number;

  books = signal<Book[]>([]);
  page = signal(1);
  isLoading = signal(false);
  isGalleryView = signal(false);
  selectedBook = signal<Book | null>(null);

  constructor(private bookService: BookService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['region'] || changes['seed']) {
      this.books.set([]);
      this.page.set(1);
      this.loadBooks();
    } else if (changes['likes']) {
      this.updateLikes();
    } else if (changes['reviews']) {
      this.updateReviews();
    }
  }

  loadBooks() {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.bookService.getBooks(this.region, this.seed, this.page(), this.likes, this.reviews)
      .subscribe({
        next: data => {
          this.books.update(prev => [...prev, ...data]);
          this.page.update(p => p + 1);
          this.isLoading.set(false);
        },
        error: err => {
          console.error('Error fetching books:', err);
          this.isLoading.set(false);
        }
      });
  }

  updateLikes() {
    this.books.set(this.books().map(book => ({
      ...book,
      likes: this.generateRelativeNumber(this.likes)
    })));
  }

  updateReviews() {
    this.books.set(this.books().map(book => ({
      ...book,
      reviews: this.generateRelativeNumber(this.reviews)
    })));
  }

  generateRelativeNumber(seed: number): number {
    const randomChoice = Math.random() < 0.5 ? 0 : 1;
    return seed % 1 !== 0
      ? randomChoice === 0 ? Math.floor(seed) : Math.ceil(seed)
      : [seed - 1, seed, seed + 1][Math.floor(Math.random() * 3)];
  }

  exportToCsv() {
    const data = this.books().map(book => ({
      Index: book.index || '',
      ISBN: book.isbn || '',
      Title: book.title || '',
      'Author(s)': book.authors || '',
      Publisher: book.publisher || '',
      Likes: book.likes || 0,
      Reviews: book.reviews || 0
    }));

    const csv = Papa.unparse(data, { quotes: true, header: true });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `books_page_${this.page() - 1}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  toggleView() {
    this.isGalleryView.set(!this.isGalleryView());
  }

  openDetails(book: Book) {
    this.selectedBook.set(book);
  }

  closeDetails() {
    this.selectedBook.set(null);
  }

  onScroll(event: any) {
    const el = event.target;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 50) {
      this.loadBooks();
    }
  }
}