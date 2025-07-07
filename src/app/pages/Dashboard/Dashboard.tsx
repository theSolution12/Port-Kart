import useGetProducts from "@/hooks/api/products/use-get-products";
import { useAuth } from "@/hooks/auth/use-auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const {name} = useAuth();
  const {data: products} = useGetProducts();
  const productCount = products?.length ?? 0;
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-yellow-300 p-8 font-mono">
      <div className="max-w-5xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-black text-white p-8 border-8 border-black shadow-[8px_8px_0px_0px_#ffffff] mb-8">
          <h1 className="text-5xl font-black mb-4">{name ? `WELCOME BACK, ${name.toUpperCase()}! 👋` : "WELCOME TO PORTKART"}</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          <div 
            className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000000] p-6 text-center cursor-pointer hover:shadow-[12px_12px_0px_0px_#000000] transition-shadow"
            onClick={() => navigate("/products")}
          >
            <div className="bg-cyan-300 border-4 border-black p-4 mb-4 inline-block">
              <div className="text-4xl">📦</div>
            </div>
            <div className="text-4xl font-black text-black mb-2">{productCount}</div>
            <div className="text-xl font-bold text-black">PRODUCTS</div>
          </div>
          
          <div className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000000] p-6 text-center">
            <div className="bg-lime-300 border-4 border-black p-4 mb-4 inline-block">
              <div className="text-4xl">👥</div>
            </div>
            <div className="text-4xl font-black text-black mb-2">54</div>
            <div className="text-xl font-bold text-black">USERS</div>
          </div>
          
          <div className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000000] p-6 text-center">
            <div className="bg-pink-300 border-4 border-black p-4 mb-4 inline-block">
              <div className="text-4xl">💰</div>
            </div>
            <div className="text-4xl font-black text-black mb-2">₹2,340</div>
            <div className="text-xl font-bold text-black">SALES</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000000] p-8">
          <div className="bg-black text-white p-4 -m-8 mb-8 border-b-8 border-black">
            <h2 className="text-3xl font-black">RECENT ACTIVITY</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-green-200 border-4 border-black p-4 flex justify-between items-center">
              <span className="font-bold">NEW PRODUCT "WIRELESS HEADPHONES" ADDED</span>
              <span className="bg-black text-white px-2 py-1 font-bold text-sm">2 MINS AGO</span>
            </div>
            
            <div className="bg-blue-200 border-4 border-black p-4 flex justify-between items-center">
              <span className="font-bold">USER "JOHN DOE" SIGNED UP</span>
              <span className="bg-black text-white px-2 py-1 font-bold text-sm">10 MINS AGO</span>
            </div>
            
            <div className="bg-purple-200 border-4 border-black p-4 flex justify-between items-center">
              <span className="font-bold">ORDER #1234 COMPLETED</span>
              <span className="bg-black text-white px-2 py-1 font-bold text-sm">30 MINS AGO</span>
            </div>
            
            <div className="bg-orange-200 border-4 border-black p-4 flex justify-between items-center">
              <span className="font-bold">STOCK UPDATED FOR "SMART WATCH"</span>
              <span className="bg-black text-white px-2 py-1 font-bold text-sm">1 HOUR AGO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
