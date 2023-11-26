import PropTypes from "prop-types";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className="min-h-screen" >
        <img
          src="/assets/home/loading2.png"
          alt="loader"
          className="animate-spin delay-300 animation w-64 mx-auto "
        />
      </div>
    );
  } else {
    if (user) {
      return children;
    } else {
      Swal.fire({
        position: "top-center",
        icon: "warning",
        color: "white",

        text: "You have to log in first",
        showConfirmButton: false,
        timer: 2000,
        background: "#3bb1ff",
      });
    }
  }
  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PrivateRoute;
