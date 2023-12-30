import clsx from "clsx";
import { useCheckout } from "./hooks/useCheckout";
import { ServerError } from "@/shared/";

export function CheckoutPage() {
    const {
        validators,
        actions,
        user, dirty, totalCartCost,
        error
    } = useCheckout();

    return (
        <div className="max-w-sm mx-auto">
            <h1 className="title"> CHECKOUT </h1>

            { error && < ServerError message={error} /> }

            <div className="text-xl my-3 border-b"> € {totalCartCost} </div>

            <form className="flex flex-col gap-3" onSubmit={actions.sendOrder}>
                Name:
                <input
                    type="text"
                    placeholder="Your name"
                    value={user.name}
                    name="name"
                    onChange={actions.changeHandler}
                    className={clsx({ 'error': !validators.isNameValid && dirty })}
                />
                
                Email:
                <input
                    type="email"
                    placeholder="Your email"
                    value={user.email}
                    name="email"
                    onChange={actions.changeHandler}
                    className={clsx({ 'error': !validators.isEmailValid && dirty })}
                />

                <button type="submit" className={clsx("btn", { primary: !validators.isValid, success: validators.isValid })} disabled={!validators.isValid }> CONFIRM ORDER </button>
            </form>
        </div>
    )
}
