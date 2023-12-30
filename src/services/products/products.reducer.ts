import { Product } from "@/model/product";
import { ProductsActions } from "./products.actions";

export interface ProductState {
    products: Product[];
    activeItem: Partial<Product> | null;
    pending: boolean;
    error: string | null;
}

export const initialState: ProductState = {
    products: [],
    activeItem: null,
    pending: false,
    error: null,
}

export function productsReducer(state: ProductState, action: ProductsActions) {   
    const {type, payload} = action;

    switch (type) {
        case 'productsGetSuccess':
            return {
                ...state,
                products: payload,
                pending: false,
                error: null
            };
        
        case 'productDeleteSuccess':
            return {
                ...state,
                products: state.products.filter(item => item.id !== payload),
                activeItem: state.activeItem?.id === payload ? null : state.activeItem,
                pending: false,
                error: null
            };
        
        case 'productAddSuccess':
            return {
                ...state,
                products: [ ...state.products, payload ],
                activeItem: null,
                pending: false,
                error: null
            };
        
        case 'productEditSuccess':
            return {
                ...state,
                products: state.products.map(item => item.id === payload.id ? payload : item),
                pending: false,
                error: null
            };
        
        case 'productSetActive':
            return { ...state, activeItem: payload };
        
        case 'pending':
            return { ...state, pending: payload, error: null };
        
        case 'error':
            return { ...state, error: payload, pending: false };
    }

    return state;
}