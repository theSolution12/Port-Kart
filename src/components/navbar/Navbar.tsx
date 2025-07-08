import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/auth/use-auth"
import { ModeToggle } from "@/components/mode-toggle"
import LogoutButton from "@/components/auth/LogoutButton"

const Navbar = () => {
  const navigate = useNavigate()
  const { user, role } = useAuth()

  return (
    <nav className="border-b sticky top-0 z-50" style={{ backgroundColor: 'hsl(var(--background) / 0.95)', backdropFilter: 'blur(8px)' }}>
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo on the left */}
        <div className="flex items-center">
          <button onClick={() => navigate("/")} className="flex items-center space-x-2 text-xl font-bold">
            PortCart
          </button>
        </div>

        {/* Navigation buttons on the right */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            style={{ 
              '--tw-ring-offset-color': 'hsl(var(--background))',
              '--tw-ring-color': 'hsl(var(--ring))'
            } as React.CSSProperties}
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/products")}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            style={{ 
              '--tw-ring-offset-color': 'hsl(var(--background))',
              '--tw-ring-color': 'hsl(var(--ring))'
            } as React.CSSProperties}
          >
            Products
          </button>

          {user ? (
            <>
              {role === "seller" && (
                <>
                  <button
                    onClick={() => navigate("/seller/dashboard")}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                    style={{ 
                      '--tw-ring-offset-color': 'hsl(var(--background))',
                      '--tw-ring-color': 'hsl(var(--ring))'
                    } as React.CSSProperties}
                  >
                    Your Store
                  </button>
                  <button
                    onClick={() => navigate("/seller/selling-history")}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                    style={{ 
                      '--tw-ring-offset-color': 'hsl(var(--background))',
                      '--tw-ring-color': 'hsl(var(--ring))'
                    } as React.CSSProperties}
                  >
                    Sales History
                  </button>
                </>
              )}

              <button
                onClick={() => navigate("/orders")}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                style={{ 
                  '--tw-ring-offset-color': 'hsl(var(--background))',
                  '--tw-ring-color': 'hsl(var(--ring))'
                } as React.CSSProperties}
              >
                Orders
              </button>

              <LogoutButton />
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                style={{ 
                  '--tw-ring-offset-color': 'hsl(var(--background))',
                  '--tw-ring-color': 'hsl(var(--ring))'
                } as React.CSSProperties}
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"
                style={{ 
                  backgroundColor: 'hsl(var(--primary))',
                  color: 'hsl(var(--primary-foreground))',
                  '--tw-ring-offset-color': 'hsl(var(--background))',
                  '--tw-ring-color': 'hsl(var(--ring))'
                } as React.CSSProperties}
              >
                Sign up
              </button>
            </>
          )}

          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
