import { useState, useEffect } from "react";
import { useCreateProduct } from "@/hooks/api/products/use-create-products";
import { useAuth } from "@/hooks/auth/use-auth";

const AddProducts = () => {
  const { mutate, isPending, error } = useCreateProduct();
  const { user, role } = useAuth();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    image_url: "",
    stock: 0,
    seller_id: "",
  });
  const [formError, setFormError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.price || !form.image_url) {
      setFormError("ALL FIELDS ARE REQUIRED!");
      return;
    }
    setFormError("");
    mutate(form);
  };

  useEffect(() => {
    if (user) {
      setForm((prev) => ({ ...prev, seller_id: user.id }));
    }
  }, [user]);

  if (role !== "seller" || !user) {
    return (
      <div className="min-h-screen bg-red-300 p-8 font-mono">
        <div className="max-w-md mx-auto">
          <div className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000000] p-8 text-center">
            <h1 className="text-4xl font-black mb-4">ACCESS DENIED!</h1>
            <p className="text-xl font-bold">SELLERS ONLY!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-300 p-8 font-mono">
      <div className="max-w-md mx-auto">
        <div className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000000] p-8">
          <h1 className="text-4xl font-black mb-8 text-center bg-black text-white p-4 -m-8 mb-8">
            ADD PRODUCT
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              name="title"
              placeholder="PRODUCT TITLE"
              value={form.title}
              onChange={handleChange}
              className="w-full p-4 border-4 border-black bg-cyan-200 text-black font-bold placeholder-black text-lg focus:outline-none focus:bg-cyan-300"
              required
            />
            
            <textarea
              name="description"
              placeholder="PRODUCT DESCRIPTION"
              value={form.description}
              onChange={handleChange}
              className="w-full p-4 border-4 border-black bg-lime-200 text-black font-bold placeholder-black text-lg focus:outline-none focus:bg-lime-300 min-h-[100px] resize-none"
              required
            />
            
            <input
              name="price"
              type="number"
              placeholder="PRICE (₹)"
              value={form.price}
              onChange={handleChange}
              className="w-full p-4 border-4 border-black bg-pink-200 text-black font-bold placeholder-black text-lg focus:outline-none focus:bg-pink-300"
              required
            />
            
            <input
              name="stock"
              type="number"
              placeholder="STOCK QUANTITY"
              value={form.stock}
              onChange={handleChange}
              className="w-full p-4 border-4 border-black bg-orange-200 text-black font-bold placeholder-black text-lg focus:outline-none focus:bg-orange-300"
              required
            />
            
            <input
              name="image_url"
              placeholder="IMAGE URL"
              value={form.image_url}
              onChange={handleChange}
              className="w-full p-4 border-4 border-black bg-yellow-200 text-black font-bold placeholder-black text-lg focus:outline-none focus:bg-yellow-300"
              required
            />
            
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-black text-white p-4 border-4 border-black font-black text-xl hover:bg-gray-800 active:shadow-none shadow-[4px_4px_0px_0px_#22c55e] disabled:opacity-50"
            >
              {isPending ? "ADDING..." : "ADD PRODUCT"}
            </button>
            
            {formError && (
              <div className="bg-red-300 border-4 border-black p-4 text-center font-bold">
                {formError}
              </div>
            )}
            
            {error && (
              <div className="bg-red-300 border-4 border-black p-4 text-center font-bold">
                ERROR: {(error as Error).message.toUpperCase()}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
