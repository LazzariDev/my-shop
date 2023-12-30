import { useProductsService } from "@/services/products";


export function CMSProductsPage() {
    const { actions, state } = useProductsService();

    async function getProductsHandler() {
        actions.getProducts();
    }
    
    return (
        <div>
            <h1 className="title"> CMS </h1>
            Pagina Prodotti

            <hr className="my-8" />

            {state.pending && <div>Loading...</div>}
            {state.error && <div>{state.error}</div>}

            <button onClick={getProductsHandler} className="btn primary">GET</button>

            <pre>{JSON.stringify(state, null, 4)}</pre>
        </div>
    )
}
