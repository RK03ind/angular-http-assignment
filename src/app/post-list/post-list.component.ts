import { Component, ElementRef, ViewChild } from '@angular/core';
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

  public currentPage: number = 1;
  public itemsPerPage: number = 12;
  public totalItems: number = 0;

  public pagedItems: any[] = [];

  @ViewChild('pagination', { static: false }) paginationElement!: ElementRef;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe({
      next: (data) => {
        this.posts = data;
        this.totalItems = data.length;
        this.updatePagedItems();
      },
      error: (error) => (this.errorMsg = error),
    });
  }

  updatePagedItems(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedItems = this.posts.slice(start, end);
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.updatePagedItems();
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  scrollToPagination(): void {
    this.paginationElement.nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
