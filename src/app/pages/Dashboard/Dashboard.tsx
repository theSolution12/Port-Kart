import { useAuth } from "@/hooks/auth/use-auth";

const Dashboard = () => {
  const {name} = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome back, {name}! 👋</h1>
          <p className="text-lg text-gray-500">Here's a quick overview of your store's performance today.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform">
            <div className="bg-blue-100 p-3 rounded-full mb-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" /></svg>
            </div>
            <div className="text-2xl font-bold text-gray-800">128</div>
            <div className="text-gray-500">Products</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform">
            <div className="bg-green-100 p-3 rounded-full mb-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-2.13a4 4 0 10-8 0 4 4 0 008 0zm6 0a4 4 0 10-8 0 4 4 0 008 0z" /></svg>
            </div>
            <div className="text-2xl font-bold text-gray-800">54</div>
            <div className="text-gray-500">Users</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform">
            <div className="bg-purple-100 p-3 rounded-full mb-3">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 8v8m8-8a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
            </div>
            <div className="text-2xl font-bold text-gray-800">$2,340</div>
            <div className="text-gray-500">Sales</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <ul className="divide-y divide-gray-100">
            <li className="py-3 flex items-center justify-between">
              <span className="text-gray-700">New product <span className="font-semibold text-blue-600">"Wireless Headphones"</span> added</span>
              <span className="text-xs text-gray-400">2 mins ago</span>
            </li>
            <li className="py-3 flex items-center justify-between">
              <span className="text-gray-700">User <span className="font-semibold text-green-600">John Doe</span> signed up</span>
              <span className="text-xs text-gray-400">10 mins ago</span>
            </li>
            <li className="py-3 flex items-center justify-between">
              <span className="text-gray-700">Order <span className="font-semibold text-purple-600">#1234</span> completed</span>
              <span className="text-xs text-gray-400">30 mins ago</span>
            </li>
            <li className="py-3 flex items-center justify-between">
              <span className="text-gray-700">Stock updated for <span className="font-semibold text-blue-600">"Smart Watch"</span></span>
              <span className="text-xs text-gray-400">1 hour ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 