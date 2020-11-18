import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { ICartItemModel, IProductAddModel, IRootModel } from '../../models/productList.model';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  cartItems: ICartItemModel[]; // holds value of Cart Items
  cartTotal = 0; // holds the length of CartItems
  totalPrice = 0; // holds the totalCartvalue
  loading: boolean; // spinner variable
  cartUpdatedValue: IProductAddModel; // get updated value of cartItem on increment/decrement of Quantity

  constructor(private apiService: ApiService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getCartData();
  }

  // calls to get the cartItems data
  getCartData(): void {
    this.loading = true;
    this.apiService.getCartDetails().subscribe((res: ICartItemModel) => {
      this.cartItems = res.cartItems;
      this.cartTotal = res.cartItems.length;
      this.totalPrice = res.totalCartValue;
      this.loading = false;
    });
  }


  // calls on Increment of quantity of a particular item
  onIncrement(productId: number): void {
    this.cartItems.forEach((element: ICartItemModel, index: number) => {
      if (element.cartId === productId) {
        this.cartItems[index].cartProductQuantity = element.cartProductQuantity + 1;
        this.getCartUpdate(element.cartProductQuantity, productId);
      }
    });
  }

  // calls on Decrement of quantity of a particular item
  onDecrement(productId: number): void {
    this.cartItems.forEach((element: ICartItemModel, index: number) => {
      if (element.cartId === productId) {
        this.cartItems[index].cartProductQuantity = element.cartProductQuantity - 1;
        this.getCartUpdate(element.cartProductQuantity, productId);
      }
    });
  }

  // calls when Increment/Decrement of Quantity
  getCartUpdate(cartProductQuantity: number, cartId: number): void {
    this.apiService.getUpdatedCart(cartProductQuantity, cartId).subscribe((res: ICartItemModel) => {
      this.cartUpdatedValue = res;
      this.getCartData();
    });
  }

  // calls on Clears the cart completed
  onClearCart(): void {
    this.apiService.clearCart().subscribe(() => {
      this.toastr.success('Successfully cleared', 'Cart has been');
      this.getCartData();
    });
  }

  // call on Order Placed
  onCheckOut(): void {
    this.apiService.checkOut().subscribe(() => {
      this.toastr.success('Order Placed, Successfully');
      this.toastr.info('(._.)', 'Your Cart is Empty Now');
      this.router.navigate(['/orderSummary']);
      this.getCartData();

    });
  }


  // calls on Remove Item from Cart
  clearItem(cartId: number): void {
    this.apiService.clearCartItem(cartId).subscribe(() => {
      this.toastr.success(' is Removed from Cart', 'Your Item');
      this.getCartData();
    });
  }

}
