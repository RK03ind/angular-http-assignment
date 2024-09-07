import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  public posts: any[] = [];
  public errorMsg: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe({
      next: (data) => (this.posts = data),
      error: (error) => (this.errorMsg = error),
    });
  }
}
