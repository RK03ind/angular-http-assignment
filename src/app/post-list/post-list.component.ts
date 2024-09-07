import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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

  public pagedItems: any[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 12;
  public totalItems: number = 0;

  isButtonVisible: boolean = true;

  @ViewChild('pagination', { static: false }) paginationElement!: ElementRef;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    this.isButtonVisible = scrollPosition + windowHeight < documentHeight - 100;
  }

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
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
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
