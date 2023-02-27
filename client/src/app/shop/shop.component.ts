import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Brands } from '../shared/models/brand';
import { Product } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { Types } from '../shared/models/type';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  @ViewChild('search') searchTeam?: ElementRef;
  products: Product[] = [];
  brands: Brands[] = [];
  types: Types[] = [];
  shopParam = new ShopParams();
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to high', value: 'priceAsc'},
    {name: 'Price: High to low', value: 'priceDesc'},
  ];
  totalCount = 0;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProduct(this.shopParam).subscribe({
      next: response => {
        this.products = response.data;
        this.shopParam.pageNumber = response.pageIndex;
        this.shopParam.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    })
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: response => this.brands = [{id: 0, name: 'All'}, ...response],
      error: error => console.log(error)
    })
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: response => this.types = [{id: 0, name: 'All'}, ...response],
      error: error => console.log(error)
    })
  }

  onBrandSelected(brandId: number) {
    this.shopParam.brandId = brandId;
    this.shopParam.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParam.typeId = typeId;
    this.shopParam.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(event: any) {
    this.shopParam.sort = event.target.value;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if(this.shopParam.pageNumber !== event) {
      this.shopParam.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParam.search = this.searchTeam?.nativeElement.value;
    this.shopParam.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    if (this.searchTeam) this.searchTeam.nativeElement.value = '';
    this.shopParam = new ShopParams();
    this.getProducts();
  }

}
