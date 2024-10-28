export interface Order{
    _id?:string;
    userID: string;
    userAddress: string,
    userPhone: string,
    status: string;
    totalAddedQuantity: number;
    grandTotal: number;
  }