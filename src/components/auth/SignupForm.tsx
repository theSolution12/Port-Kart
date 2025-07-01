import { useState } from "react";
import useSignUp from "@/hooks/auth/use-signup";

const SELLER_SECRET = import.meta.env.VITE_SELLER_SECRET;

const SignupForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer" as "customer" | "seller",
    sellerCode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!form.name) {
      newErrors.name = "Name is required";
    } else if (form.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm password validation
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { mutate, isPending, error, isSuccess } = useSignUp();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const isSeller = form.role === "seller";
    const approvedSeller = !isSeller || (isSeller && form.sellerCode === SELLER_SECRET);
    const finalRole = approvedSeller ? form.role : "customer";
    mutate({ ...form, role: finalRole as "customer" | "seller" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-50 font-sans">
      <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur rounded-xl shadow-xl p-10 w-full max-w-md flex flex-col gap-6 border border-slate-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 tracking-tight">Create your account</h2>
        <div>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className={`border border-slate-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50 text-gray-800 placeholder-gray-400 ${errors.name ? 'border-red-400' : ''}`}
            required
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>
        <div>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className={`border border-slate-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50 text-gray-800 placeholder-gray-400 ${errors.email ? 'border-red-400' : ''}`}
            required
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
        <div>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            className={`border border-slate-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50 text-gray-800 placeholder-gray-400 ${errors.password ? 'border-red-400' : ''}`}
            required
          />
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
        </div>
        <div>
          <input
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            type="password"
            className={`border border-slate-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50 text-gray-800 placeholder-gray-400 ${errors.confirmPassword ? 'border-red-400' : ''}`}
            required
          />
          {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
        </div>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border border-slate-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50 text-gray-800"
        >
          <option value="customer">Customer</option>
          <option value="seller">Seller</option>
        </select>
        {form.role === "seller" && (
          <input
            name="sellerCode"
            value={form.sellerCode}
            onChange={handleChange}
            placeholder="Seller secret"
            type="password"
            className="border border-slate-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50 text-gray-800 placeholder-gray-400"
          />
        )}
        <button
          type="submit"
          disabled={isPending}
          className="bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg shadow hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          {isPending ? "Signing up..." : "Sign Up"}
        </button>
        {isSuccess && <p className="text-green-600 text-center text-sm">Signed up successfully!</p>}
        {error && <p className="text-red-600 text-center text-sm">{(error as Error).message}</p>}
      </form>
    </div>
  );
};

export default SignupForm;
