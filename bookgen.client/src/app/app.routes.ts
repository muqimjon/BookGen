import { Routes } from '@angular/router';
import { ControlsComponent } from './core/features/controls/controls.component';
import { BookListComponent } from './core/features/booklist/booklist.component';

export const routes: Routes = [
  { path: '', component: ControlsComponent },
  { path: 'books', component: BookListComponent },
  { path: '**', redirectTo: '' }
];
