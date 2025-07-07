import useLogout from "@/hooks/auth/use-logout";

const LogoutButton = () => {
  const { mutate, isPending } = useLogout();

  const handleLogout = () => {
    mutate(undefined, {});
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="bg-red-500 text-white px-4 py-2 border-4 border-black font-black hover:bg-red-400 shadow-[4px_4px_0px_0px_#000000] active:shadow-none disabled:opacity-50"
    >
      {isPending ? "LOGGING OUT..." : "LOGOUT"}
    </button>
  );
};

export default LogoutButton;
