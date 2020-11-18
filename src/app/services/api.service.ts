import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ICartItemModel, IClearCartModel, ILoginModel, IOrderSummaryModel, IProductAddModel, IProductListModel, ISignupModel } from './../components/models/productList.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  tokenValue = localStorage.getItem('token');
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  // User Login
  login(userName: string, passWord: string): Observable<ILoginModel> {
    return this.http.post<ILoginModel>
      (this.baseUrl + 'login', { username: userName, password: passWord });
  }


  // Get Product List
  getProductList(): Observable<IProductListModel> {
    return this.http.get<IProductListModel>(this.baseUrl + 'product');
  }

  // Add a product to Cart
  updateCart(cartProductImageUrl: string, productName: string, productPrice: number): Observable<IProductAddModel> {
    return this.http.post<IProductAddModel>
      (this.baseUrl + 'cart/createCart',
        {
          cartProductimageUrl: cartProductImageUrl,
          token: this.tokenValue,
          cartProductName: productName,
          cartProductPrice: productPrice
        });
  }

  // to view Cart Items
  getCartDetails(): Observable<ICartItemModel> {
    return this.http.post<ICartItemModel>
      (this.baseUrl + 'cart', { token: this.tokenValue });
  }

  // to update quantity and price of a cartItem
  getUpdatedCart(cartProductQuantityValue: number, cartIdValue: number): Observable<IProductAddModel> {
    return this.http.post<IProductAddModel>
      (this.baseUrl + 'cart/updateCart', { cartProductQuantity: cartProductQuantityValue, cartId: cartIdValue });
  }

  // to Remove a Item from Cart
  clearCartItem(cartIdValue: number): Observable<IProductListModel> {
    return this.http.post<IProductListModel>
      (this.baseUrl + 'cart/clear', { cartId: cartIdValue, token: this.tokenValue });
  }

  // to Remove All Cart Items
  clearCart(): Observable<IClearCartModel> {
    return this.http.post<IClearCartModel>
      (this.baseUrl + 'cart/clear', { token: this.tokenValue });
  }

  // on Placing an Order
  checkOut(): Observable<IProductListModel> {
    return this.http.post<IProductListModel>
      (this.baseUrl + 'order/create', { token: this.tokenValue });
  }

  // to Remove Order Card Summary
  getClearOrderSummary(): Observable<IClearCartModel> {
    return this.http.post<IClearCartModel>
      (this.baseUrl + 'order/clear', { token: this.tokenValue });
  }
  // Get details of Order Summary
  getOrderSummary(): Observable<IOrderSummaryModel> {
    return this.http.post<IOrderSummaryModel>(this.baseUrl + 'order', { token: this.tokenValue });
  }

  // during signup
  signup(userName: string, passWord: string): Observable<ISignupModel> {
    return this.http.post<ISignupModel>(this.baseUrl + 'signup', { username: userName, password: passWord });
  }
}
