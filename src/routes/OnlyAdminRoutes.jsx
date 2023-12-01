import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useRole from "../hooks/useRole";
const OnlyAdminRoutes = ({children}) => {
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
      if (user && role === "admin") {
        return children;
      } else {
        Swal.fire({
         
          icon: "warning",
          color: "white",
          title: "Only Admin have access to this!!",
          text: "Go log in as admin and try again!",
          showConfirmButton: false,
          timer: 3000,
          background: "#38B6FF",
        });
        return <Navigate state={location.pathname} to={"/login"}></Navigate>;
      }
    }
  }
};
OnlyAdminRoutes.propTypes = {
    children: PropTypes.node.isRequired,
  };
export default OnlyAdminRoutes;