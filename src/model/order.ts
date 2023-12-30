import {CartItem} from "@/model/cart-item.ts";
import {OrderStatus, OrderUser} from "@/model/order-form.ts";

export interface Order {
    collectionId: string;
    collectionName: string;
    created: string;
    id: string;
    order: CartItem[];
    status: OrderStatus;
    total: number;
    updated: string;
    user: OrderUser;
}