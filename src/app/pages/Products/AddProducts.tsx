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
      setFormError("All fields are required.");
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
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-50 font-sans text-lg text-gray-600">You are not authorized to add products</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-50 font-sans">
      <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur rounded-xl shadow-xl p-10 w-full max-w-md flex flex-col gap-6 border border-slate-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 tracking-tight">Add a New Product</h2>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border border-slate-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50 text-gray-800 placeholder-gray-400"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border border-slate-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50 text-gray-800 placeholder-gray-400 min-h-[80px]"
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border border-slate-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50 text-gray-800 placeholder-gray-400"
          required
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="border border-slate-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50 text-gray-800 placeholder-gray-400"
          required
        />
        <input
          name="image_url"
          placeholder="Image URL"
          value={form.image_url}
          onChange={handleChange}
          className="border border-slate-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50 text-gray-800 placeholder-gray-400"
          required
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg shadow hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          {isPending ? "Adding..." : "Add Product"}
        </button>
        {formError && <p className="text-xs text-red-500 text-center mt-1">{formError}</p>}
        {error && <p className="text-xs text-red-500 text-center mt-1">Error: {(error as Error).message}</p>}
      </form>
    </div>
  );
};

export default AddProducts;
