// HOOKS
import useGetProducts from "@/hooks/api/products/use-get-products";
// TYPES
import type { Product } from "@/types/product";

const ListProducts = () => {
    const { data: products = [], isLoading, error } = useGetProducts();

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-50 font-sans">
                <div className="bg-white/90 backdrop-blur rounded-xl shadow-xl p-8 max-w-md w-full text-center border border-slate-100">
                    <p className="text-red-600 text-lg font-medium">Error loading products: {(error as Error).message}</p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-50 font-sans">
                <div className="bg-white/90 backdrop-blur rounded-xl shadow-xl p-8 max-w-md w-full text-center border border-slate-100">
                    <p className="text-indigo-600 text-lg font-medium animate-pulse">Loading products...</p>
                </div>
            </div>
        );
    }

    if (!products.length) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-50 font-sans">
                <div className="bg-white/90 backdrop-blur rounded-xl shadow-xl p-8 max-w-md w-full text-center border border-slate-100">
                    <p className="text-gray-600 text-lg font-medium">No products found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-50 font-sans py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-semibold text-gray-800 mb-8 tracking-tight text-center">Products</h1>
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product: Product) => (
                        <div key={product.id} className="bg-white/90 backdrop-blur rounded-xl shadow-lg p-5 flex flex-col border border-slate-100 hover:shadow-2xl transition-shadow">
                            {product.image_url && (
                                <img
                                    src={product.image_url}
                                    alt={product.title}
                                    className="w-full h-40 object-cover rounded-lg mb-4 border border-slate-100"
                                />
                            )}
                            <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">{product.title}</h2>
                            <p className="text-gray-600 mb-2 line-clamp-3">Stock: {product.stock}</p>
                            <div className="mt-auto">
                                <span className="text-indigo-600 font-semibold text-lg">${product.price}</span>
                            </div>
                        {product.seller?.name && (
                            <div className="mt-2 text-sm text-gray-500">
                                Sold by: <span className="font-medium text-gray-700">{product.seller.name}</span>
                            </div>
                        )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListProducts;