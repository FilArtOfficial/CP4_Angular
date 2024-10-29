import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'https://dummyjson.com/products?limit=50';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(this.productsUrl);
  }

  extractCategories(products: any[]): string[] {
    const categories = products.map((product) => product.category);
    return Array.from(new Set(categories));
  }

  filterProducts(
    products: any[],
    searchName: string,
    maxPrice: number,
    rating: number,
    category: string
  ): any[] {
    return products.filter((product) => {
      return (
        product.title.toLowerCase().includes(searchName.toLowerCase()) &&
        product.price <= maxPrice &&
        product.rating >= rating &&
        (category ? product.category === category : true)
      );
    });
  }
}
