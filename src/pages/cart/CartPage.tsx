import { selectCartIsEmpty, selectCartList, selectTotalCartCost, useCart } from "@/services/cart"
import { NavLink } from "react-router-dom";

export function CartPage() {
    const list = useCart(selectCartList);
    const totalCost = useCart(selectTotalCartCost);
    const isEmpty = useCart(selectCartIsEmpty);
    const increaseQty = useCart(state => state.increaseQty);
    const decreseQty = useCart(state => state.decreseQty);

    return (
        <div>
            <h1 className="title"> CART </h1>

            <ul>
                {
                    list.map(p => (
                            <li key={p.product.id} className="flex flex-col sm:flex-row justify-between items-center gap-3 my-3 border-b border-blue-400 py-3">
                                <div className="flex items-center gap-3">
                                    <img src={p.product.tmb} alt={p.product.name} className="w-24 rounded-xl" />
                                    <div className="font-bold"> {p.product.name} </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 items-center">
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => decreseQty(p.product.id)} className="btn primary"> - </button>
                                        <div>qty: {p.qty}</div>
                                        <button onClick={() => increaseQty(p.product.id)} className="btn primary"> + </button>
                                    </div>
                                    <div className="w-16 text-center">
                                        € {p.product.cost * p.qty}
                                    </div>
                                </div>
                            </li>
                        ))
                }
            </ul>

            <div className="text-4xl text-right my-4 mr-4">
                Total: € {totalCost}
            </div>

            {!isEmpty && (
                <div className="flex justify-center">
                    <NavLink to="/checkout" className="btn primary lg"> Confirm order </NavLink>
                </div>
            )}
        </div>
    )
}
