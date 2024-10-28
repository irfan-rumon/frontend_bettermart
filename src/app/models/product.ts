export interface Product {
    _id:string;
    imageURL: string;
    name: string;
    catagory: string;
    brand: string;
    isTrending: boolean;
    unitPrice : number;
    stockAvailable: number;
  }