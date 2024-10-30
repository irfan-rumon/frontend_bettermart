export interface Product {
  id: any;
  image_link: string;  
  name: string;
  category?: string | null;   
  isTrending?: boolean;
  price: number;
 
}