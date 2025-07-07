import { useState } from "react";
import useSignUp from "@/hooks/auth/use-signup";

const SELLER_SECRET = import.meta.env.VITE_SELLER_SECRET;

const SignupForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    role: "customer" as "customer" | "seller",
    sellerCode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name) {
      newErrors.name = "NAME IS REQUIRED";
    } else if (form.name.length < 2) {
      newErrors.name = "NAME TOO SHORT";
    }

    if (!form.email) {
      newErrors.email = "EMAIL IS REQUIRED";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "EMAIL IS INVALID";
    }

    if (!form.password) {
      newErrors.password = "PASSWORD IS REQUIRED";
    } else if (form.password.length < 6) {
      newErrors.password = "PASSWORD TOO SHORT";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "CONFIRM PASSWORD";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "PASSWORDS DON'T MATCH";
    }

    if (!form.address) {
      newErrors.address = "ADDRESS IS REQUIRED";
    }

    if (form.role === "seller" && form.sellerCode !== SELLER_SECRET) {
      newErrors.sellerCode = "INVALID SELLER CODE";
    }

    if (!form.role) {
      newErrors.role = "ROLE IS REQUIRED";
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
    <div className="min-h-screen bg-yellow-300 p-8 font-mono">
      <div className="max-w-md mx-auto">
        <div className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000000] p-8">
          <h1 className="text-4xl font-black mb-8 text-center bg-black text-white p-4 -m-8 mb-8">
            CREATE ACCOUNT
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="FULL NAME"
                className={`w-full p-4 border-4 border-black bg-cyan-200 text-black font-bold placeholder-black text-lg focus:outline-none focus:bg-cyan-300 ${errors.name ? 'bg-red-300' : ''}`}
                required
              />
              {errors.name && <p className="text-red-600 font-bold mt-2 text-sm">{errors.name}</p>}
            </div>

            <div>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="EMAIL ADDRESS"
                className={`w-full p-4 border-4 border-black bg-lime-200 text-black font-bold placeholder-black text-lg focus:outline-none focus:bg-lime-300 ${errors.email ? 'bg-red-300' : ''}`}
                required
              />
              {errors.email && <p className="text-red-600 font-bold mt-2 text-sm">{errors.email}</p>}
            </div>

            <div>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="PASSWORD"
                type="password"
                className={`w-full p-4 border-4 border-black bg-pink-200 text-black font-bold placeholder-black text-lg focus:outline-none focus:bg-pink-300 ${errors.password ? 'bg-red-300' : ''}`}
                required
              />
              {errors.password && <p className="text-red-600 font-bold mt-2 text-sm">{errors.password}</p>}
            </div>

            <div>
              <input
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="CONFIRM PASSWORD"
                type="password"
                className={`w-full p-4 border-4 border-black bg-orange-200 text-black font-bold placeholder-black text-lg focus:outline-none focus:bg-orange-300 ${errors.confirmPassword ? 'bg-red-300' : ''}`}
                required
              />
              {errors.confirmPassword && <p className="text-red-600 font-bold mt-2 text-sm">{errors.confirmPassword}</p>}
            </div>

            <div>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="DELIVERY ADDRESS"
                className="w-full p-4 border-4 border-black bg-purple-200 text-black font-bold placeholder-black text-lg focus:outline-none focus:bg-purple-300"
                required
              />
              {errors.address && <p className="text-red-600 font-bold mt-2 text-sm">{errors.address}</p>}
            </div>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-4 border-4 border-black bg-blue-200 text-black font-bold text-lg focus:outline-none focus:bg-blue-300"
            >
              <option value="customer">CUSTOMER</option>
              <option value="seller">SELLER</option>
            </select>

            {form.role === "seller" && (
              <input
                name="sellerCode"
                value={form.sellerCode}
                onChange={handleChange}
                placeholder="SELLER SECRET CODE"
                type="password"
                className="w-full p-4 border-4 border-black bg-red-200 text-black font-bold placeholder-black text-lg focus:outline-none focus:bg-red-300"
              />
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-black text-white p-4 border-4 border-black font-black text-xl hover:bg-gray-800 active:shadow-none shadow-[4px_4px_0px_0px_#ef4444] disabled:opacity-50"
            >
              {isPending ? "CREATING..." : "CREATE ACCOUNT"}
            </button>

            {isSuccess && (
              <div className="bg-green-300 border-4 border-black p-4 text-center font-bold">
                ACCOUNT CREATED SUCCESSFULLY!
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

export default SignupForm;
