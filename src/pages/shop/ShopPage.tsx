import { Product } from '@/model/product';
import { pb } from '@/pocketbase';
import { useEffect, useState } from 'react';

export function ShopPage() {
    const [ products, setProducts ] = useState<Product[]>([]);

    useEffect(() => {
        loadData();
    }, [])

    function loadData() {
        pb.collection('products').getList<Product>()
            .then(res => {
                setProducts(res.items)
            })
    }

    return (
        <div>
            <h1 className="title"> SHOP </h1>

            {
                products.map(p => (
                    <li key={p.id}>
                        {p.name}
                    </li>
                ))
            }

        </div>
    )
}
