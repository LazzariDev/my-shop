import { CartItem } from "@/model/cart-item";
import { Product } from "@/model/product";
import { create } from "zustand";

export interface CartState {
    list: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    increaseQty: (productId: string) => void;
    decreseQty: (productId: string) => void;
    clearCart: () => void;
}

export const useCart = create<CartState>((set, get) => ({
    list: [],
    addToCart: (product: Product) => {

        const found = get().list.find(item => item.product.id === product.id)
        if (found) {
            // Increase qty
            get().increaseQty(product.id)

        } else {
            // Add product to cart
            const item: CartItem = { product, qty: 1 };
            // set({ list: [...get().list, item] }); oppure
            set(state => ({ list: [...state.list, item ]}));
        }

    },
    removeFromCart: (productId: string) => {
        set(state => ({ list: state.list.filter(item => item.product.id !== productId) }))
    },
    increaseQty: (productId: string) => {
        const found = get().list.find(item => item.product.id === productId);
        if (found) {
            found.qty++;
            set(state => ({
                list: state.list.map(item => {
                    return item.product.id === found.product.id ? found : item;
                })
            }))
        }
    },
    decreseQty: (productId: string) => {
        const found = get().list.find(item => item.product.id === productId);
        
        if (found?.qty === 1) {
            get().removeFromCart(productId)
        }
        
        if (found && found.qty > 0) {
            found.qty--;
            set(state => ({
                list: state.list.map(item => {
                    return item.product.id === found.product.id ? found : item;
                })
            }))
        }
    },
    clearCart: () => {
        set({ list: [] });
    }
}))