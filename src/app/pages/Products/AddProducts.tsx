import { useState } from "react";
import { useCreateProduct } from "@/hooks/api/products/use-create-products";

const AddProducts = () => {
  const { mutate, isPending, error } = useCreateProduct();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    image_url: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md">
      <input name="title" placeholder="Title" onChange={handleChange} className="w-full border p-2" />
      <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full border p-2" />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} className="w-full border p-2" />
      <input name="image_url" placeholder="Image URL" onChange={handleChange} className="w-full border p-2" />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={isPending}>
        {isPending ? "Adding..." : "Add Product"}
      </button>

      {error && <p className="text-red-600">Error: {(error as Error).message}</p>}
    </form>
  );
};

export default AddProducts;
