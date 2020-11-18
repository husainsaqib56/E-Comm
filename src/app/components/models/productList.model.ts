export interface IProductListModel {
  productId: number;
  category: string;
  imageUrl: string;
  productDescription: string;
  productName: string;
  productPrice: number;
  length?: number;
}


export interface IProductAddModel {
  cartId: number;
  cartProductName: string;
  cartProductPrice: number;
  cartProductQuantity: number;
  cartProductimageUrl: string;
  cartfinalProductPrice: number;
  cartuserId: number;
  updatedAt: string;
  message?: string;
}

export interface IClearCartModel {
  count: number;
}

export interface ICheckOutModel {
  productName: string;
  price: number;
  quantity: number;
}

export interface ICartItemModel {
  [x: string]: any;
  cartId: number;
  cartProductName: string;
  cartProductPrice: number;
  cartProductQuantity: number;
  cartProductimageUrl: string | null;
  cartfinalProductPrice: number;
  cartuserId: number;
  updatedAt: string;
  message?: string;
}

export interface ILoginModel {
  accessToken: string;
  messsage: string;
  username: string;
  password?: string;
}

export interface ISignupModel {
  userId?: number;
  createdAt?: string;
  username: string;
  password: string;
}
export interface ISearchModel {
  category: string;
  imageUrl: string;
  productDescription: string;
  productId: string;
  productName: string;
  productPrice: number;
}


export interface IRootModel {
  [x: string]: any;
  cartItems: ICartItemModel[];
  totalCartValue: number;
}

export interface IOrderSummaryModel {
  createdAt: string;
  orderId: number;
  orderProductName: string;
  orderProductPrice: number;
  orderProductQuantity: number;
  orderimageUrl: string;
  userID: number;
  length?: number;
}
