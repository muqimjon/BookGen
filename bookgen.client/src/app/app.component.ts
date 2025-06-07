import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsComponent } from './core/features/controls/controls.component';
import { BookListComponent } from './core/features/booklist/booklist.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ControlsComponent, BookListComponent],
  template: `
    <div class="container">
      <h1 class="my-4 text-center">📚 Book Generator</h1>
      <app-controls (paramsChanged)="onParamsChanged($event)"></app-controls>
      <app-book-list
        [region]="region"
        [seed]="seed"
        [likes]="likes"
        [reviews]="reviews">
      </app-book-list>
    </div>
  `
})
export class AppComponent {
  region = 'en_US';
  seed = 123;
  likes = 5;
  reviews = 5;

  onParamsChanged(params: { region: string; seed: number; likes: number; reviews: number }) {
    this.region = params.region;
    this.seed = params.seed;
    this.likes = params.likes;
    this.reviews = params.reviews;
  }
}
