import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth/use-auth";
import LogoutButton from "../auth/LogoutButton";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, role } = useAuth();

    return (
        <nav className="w-full h-16 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg z-50 border-b border-blue-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full">
                    <div className="flex-shrink-0 flex items-center">
                        <span className="text-white text-2xl font-extrabold tracking-tight cursor-pointer" onClick={() => navigate('/')}>PortCart</span>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => navigate('/')}
                            className="text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-500 transition-colors"
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => navigate('/products')}
                            className="text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-500 transition-colors"
                        >
                            Products
                        </button>
                        {user ? (
                            <>
                                {role === 'seller' && (
                                    <button
                                        onClick={() => navigate('/seller/dashboard')}
                                        className="text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-600 transition-colors bg-indigo-500"
                                    >
                                        Your Store
                                    </button>
                                )}
                                <LogoutButton />
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-500 transition-colors"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-500 transition-colors"
                                >
                                    Signup
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;