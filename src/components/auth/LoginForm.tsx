import { useState } from "react";
import useLogin from "@/hooks/auth/use-login";

const LoginForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { mutate, isPending, error, isSuccess } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email: form.email, password: form.password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-50 font-sans">
      <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur rounded-xl shadow-xl p-10 w-full max-w-md flex flex-col gap-6 border border-slate-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 tracking-tight">Sign in to your account</h2>
        <div>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border border-slate-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50 text-gray-800 placeholder-gray-400"
            required
          />
        </div>
        <div>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            className="border border-slate-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50 text-gray-800 placeholder-gray-400"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg shadow hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          {isPending ? "Signing in..." : "Sign In"}
        </button>
        {isSuccess && <p className="text-green-600 text-center text-sm">Logged in successfully!</p>}
        {error && <p className="text-red-600 text-center text-sm">{(error as Error).message}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
