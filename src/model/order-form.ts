import { CartItem } from "@/model/cart-item";

export interface OrderForm {
    user: OrderUser;
    order: CartItem[];
    status: OrderStatus;
    total: number;
}

export interface OrderUser {
    name: string;
    email: string;
}

export type OrderStatus = 'pending' | 'done';