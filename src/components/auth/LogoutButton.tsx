import useLogout from "@/hooks/auth/use-logout";
// import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { mutate, isPending } = useLogout();
  // const navigate = useNavigate();

  const handleLogout = () => {
    mutate(undefined, {
      // onSuccess: () => {
      //   navigate("/");
      // },
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;