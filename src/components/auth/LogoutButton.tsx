import useLogout from "@/hooks/auth/use-logout"

const LogoutButton = () => {
  const { mutate, isPending } = useLogout()

  const handleLogout = () => {
    mutate(undefined, {})
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
    >
      {isPending ? "Logging out..." : "Logout"}
    </button>
  )
}

export default LogoutButton
