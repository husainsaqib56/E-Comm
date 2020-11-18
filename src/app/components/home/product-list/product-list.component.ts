import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { IProductAddModel, IProductListModel } from '../../models/productList.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productData: IProductListModel; // holds the product List
  cartUpdated: IProductAddModel; // holds the updated CartItems
  myToken: string; // use to check user is Logged in or not
  searchfield: string; // used for filtering product
  loading = false; // spinner variable
  userName: string;
  // tslint:disable-next-line: max-line-length
  constructor(private productService: ApiService, private toastr: ToastrService, private route: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.getProductList();
    this.userService.isLoggedIn.subscribe((res) => {
      this.myToken = res;
      console.log(res);
    });
  }

  // calls to get Product List
  getProductList(): void {
    this.loading = true;
    this.productService.getProductList().subscribe((res: IProductListModel) => {
      this.productData = res;
      this.loading = false;
    });
  }

  // calls to Add Items into cart

  handleCart(productItem: IProductListModel): void {
    // debugger;
    const token = localStorage.getItem('token');
    if (!token) {
      this.toastr.warning('You Need to Login!', 'Hey There!');
      this.route.navigate(['login']);
    } else {
      this.productService.updateCart(productItem.imageUrl, productItem.productName, productItem.productPrice)
        .subscribe((res: IProductAddModel) => {
          this.cartUpdated = res;

          if (res.message === 'Product already in cart') {
            this.toastr.info('Product already in cart', 'Oops!');
          }
          else {
            this.toastr.success('Successfully', 'Cart Updated');
          }
        });
    }
  }
}
