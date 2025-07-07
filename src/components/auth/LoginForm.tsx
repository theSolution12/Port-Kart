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
    <div className="min-h-screen bg-cyan-300 p-8 font-mono">
      <div className="max-w-md mx-auto">
        <div className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000000] p-8">
          <h1 className="text-4xl font-black mb-8 text-center bg-black text-white p-4 -m-8 mb-8">
            LOGIN
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="EMAIL ADDRESS"
                className="w-full p-4 border-4 border-black bg-lime-200 text-black font-bold placeholder-black text-lg focus:outline-none focus:bg-lime-300"
                required
              />
            </div>
            
            <div>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="PASSWORD"
                type="password"
                className="w-full p-4 border-4 border-black bg-pink-200 text-black font-bold placeholder-black text-lg focus:outline-none focus:bg-pink-300"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-black text-white p-4 border-4 border-black font-black text-xl hover:bg-gray-800 active:shadow-none shadow-[4px_4px_0px_0px_#22c55e] disabled:opacity-50"
            >
              {isPending ? "SIGNING IN..." : "SIGN IN"}
            </button>
            
            {isSuccess && (
              <div className="bg-green-300 border-4 border-black p-4 text-center font-bold">
                LOGGED IN SUCCESSFULLY!
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

export default LoginForm;
