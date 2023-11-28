import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useRole from "../hooks/useRole";
const OnlyAgentRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const [role, isLoading] = useRole(user?.email);
  const location = useLocation();
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <img
          src="/assets/home/loading2.png"
          alt="loader"
          className="motion-safe:animate-spin w-64 mx-auto "
        />
      </div>
    );
  } else {
    if (!isLoading) {
      if (user && role === "agent") {
        return children;
      } else {
        Swal.fire({
         
          icon: "warning",
          color: "white",
          title: "Only Agent can Access!!",
          text: "Go log in as agent and try again!",
          showConfirmButton: false,
          timer: 3000,
          background: "#18b47b",
        });
        return <Navigate state={location.pathname} to={"/login"}></Navigate>;
      }
    }
  }
};
OnlyAgentRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
export default OnlyAgentRoutes;
