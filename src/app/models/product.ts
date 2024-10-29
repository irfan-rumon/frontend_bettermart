export interface Product {
  id?: string;
  image_link: string;  
  name: string;
  category?: string | null;   
  isTrending?: boolean;
  price: number;
 
}