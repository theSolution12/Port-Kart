// HOOKS
import useGetProducts from "../../../hooks/api/products/use-get-products";
// TYPES
import type { Product } from "../../../types/product";

const ListProducts = () => {
    const { data: products = [], isLoading, error } = useGetProducts();

    if (error) {
        return <div>Error loading products: {(error as Error).message}</div>;
    }

    if (isLoading) {
        return <div>Loading products...</div>;
    }

    if (!products.length) {
        return <div>No products found</div>;
    }

    return (
        <div>
            <h1>Products</h1>
            <div>
                {products.map((product : Product) => (
                    <div key={product.id}>{product.title}</div>
                ))}
            </div>
        </div>
    );
}

export default ListProducts;