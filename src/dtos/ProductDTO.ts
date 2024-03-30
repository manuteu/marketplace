import { ImageSourcePropType } from "react-native";

export interface ProductUser {
  avatar: string;
  name: string;
  tel: string;
}

export interface PaymentMethod {
  key: 'boleto' | 'cash' | 'deposit' | 'pix' | 'card';
  name: string;
}

export interface ProductImages {
  path: string;
  id: string;
}

export interface ProductDTO {
  id: string;
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  user_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  product_images: ProductImages[];
  payment_methods: PaymentMethod[];
  user: ProductUser
}
