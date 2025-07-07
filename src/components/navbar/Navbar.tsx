import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth/use-auth";
import LogoutButton from "../auth/LogoutButton";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, role } = useAuth();

    return (
        <nav className="w-full bg-black border-b-8 border-white font-mono sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0">
                        <button 
                            onClick={() => navigate('/')}
                            className="text-white text-4xl font-black tracking-tight hover:text-yellow-300 transition-colors"
                        >
                            PORTKART
                        </button>
                    </div>
                    
                    <div className="flex space-x-2">
                        <button
                            onClick={() => navigate('/')}
                            className="bg-cyan-400 text-black px-4 py-2 border-4 border-black font-black hover:bg-cyan-300 shadow-[4px_4px_0px_0px_#000000] active:shadow-none"
                        >
                            DASHBOARD
                        </button>
                        
                        <button
                            onClick={() => navigate('/products')}
                            className="bg-lime-400 text-black px-4 py-2 border-4 border-black font-black hover:bg-lime-300 shadow-[4px_4px_0px_0px_#000000] active:shadow-none"
                        >
                            PRODUCTS
                        </button>
                        
                        {user ? (
                            <>
                                {role === 'seller' && (
                                    <>
                                       <button
                                        onClick={() => navigate('/seller/dashboard')}
                                        className="bg-purple-400 text-black px-4 py-2 border-4 border-black font-black hover:bg-purple-300 shadow-[4px_4px_0px_0px_#000000] active:shadow-none"
                                    >
                                        YOUR STORE
                                    </button>
                                    <button
                                        onClick={() => navigate('/seller/selling-history')}
                                        className="bg-pink-400 text-black px-4 py-2 border-4 border-black font-black hover:bg-pink-300 shadow-[4px_4px_0px_0px_#000000] active:shadow-none"
                                    >
                                        SALES
                                    </button> 
                                    </>
                                )}
                                
                                <button
                                    onClick={() => navigate('/orders')}
                                    className="bg-orange-400 text-black px-4 py-2 border-4 border-black font-black hover:bg-orange-300 shadow-[4px_4px_0px_0px_#000000] active:shadow-none"
                                >
                                    ORDERS
                                </button>
                                
                                <LogoutButton />
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="bg-green-400 text-black px-4 py-2 border-4 border-black font-black hover:bg-green-300 shadow-[4px_4px_0px_0px_#000000] active:shadow-none"
                                >
                                    LOGIN
                                </button>
                                
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="bg-yellow-400 text-black px-4 py-2 border-4 border-black font-black hover:bg-yellow-300 shadow-[4px_4px_0px_0px_#000000] active:shadow-none"
                                >
                                    SIGNUP
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
