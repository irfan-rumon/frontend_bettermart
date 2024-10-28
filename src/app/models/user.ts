export interface User{
    _id?:string;
    userName: string;
    email: string;
    fullName: string;
    phone: string;
    address: string;
    password:string;
    passConfirm?:string;
    roll?:string;
  }