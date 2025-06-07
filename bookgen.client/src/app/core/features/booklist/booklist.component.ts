import { Component, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';

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

  constructor(private bookService: BookService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['region'] || changes['seed'] || changes['likes'] || changes['reviews']) {
      this.books.set([]);
      this.loadBooks();
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

  onScroll(event: any) {
    const el = event.target;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;
    if (atBottom) this.loadBooks();
  }
  
}
