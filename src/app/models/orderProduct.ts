export interface OrderProduct {
    _id?: string;
    productID: number;
    userID: number;
    imageURL: string;
    name: string;
    unitPrice : number;
    quantity: number;
    brand: string;
    subtotal: number;
    orderID: string;
  }