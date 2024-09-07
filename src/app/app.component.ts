import { Component } from '@angular/core';
import { PostListComponent } from './post-list/post-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PostListComponent],
  template: '<app-post-list></app-post-list>',
})
export class AppComponent {}
