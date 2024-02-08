import { MdLogout } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LogOutButton = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate()
  const handleLogOut = () => {
    logOut().then(
      toast("User has been logged out", {
        icon: <MdLogout />,
        style: {
          background: "#ff92b4",
        },
      })
      );
      navigate('/')
  };
  return (
    <button
      onClick={handleLogOut}
      className="btn btn-secondary border-white hover:border-white w-full text-white btn-sm"
    >
      LOG OUT
    </button>
  );
};

export default LogOutButton;
