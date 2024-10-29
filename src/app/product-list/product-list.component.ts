import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class ProductListComponent implements OnInit {
  searchName: string = '';
  maxPrice: number = 1000;
  rating: number = 0;
  category: string = '';
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data.products;
      this.filteredProducts = this.products;
      this.categories = this.productService.extractCategories(this.products);
    });
  }

  onFilter(): void {
    this.filteredProducts = this.productService.filterProducts(
      this.products,
      this.searchName,
      this.maxPrice,
      this.rating,
      this.category
    );
  }
}
