import { Link, NavLink } from "react-router-dom";
import HeaderText from "../components/HeaderText/HeaderText";
import { FaRegUserCircle } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { MdReviews } from "react-icons/md";
import { BsClipboardHeart } from "react-icons/bs";
import { IoIosHome } from "react-icons/io";

const DashboardLayout = () => {
    const userNavlinks =(
        <>
         <NavLink
        to="/dashboard/user-profile"
        className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold" : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
        }
      >
    <FaRegUserCircle className="inline text-xl mr-3"/> My Profile
      </NavLink>
      <NavLink
        to="/wishlist"
        className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold" : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
        }
      >
        <BsClipboardHeart className="inline text-xl mr-3"/>WishList
      </NavLink>
      <NavLink
        to="/dashboard/property-bought"
        className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold" : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
    }
      >
       <FaBuildingUser className="inline text-xl mr-3"/> Property Bought
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold" : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
        }
      >
       <MdReviews className="inline text-xl mr-3"/> My Reviews
      </NavLink>
        </>
    )
  return (
    <div>
       
      <div className="drawer md:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button md:hidden"
          >
            Open DASHBOARD
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu gap-6 p-4 w-80 min-h-full  bg-gradient-to-tr from-secondary to-accent ">
            {/* Sidebar content here */}
        

            <HeaderText headerText={`DASHBOARD`} />
           
            {
                userNavlinks
            }
            <hr  className="border-white"/>
          
                <span className="hover:bg-white py-2 px-3 hover:text-neutral transition duration-200  rounded-xl ">

                <Link to={'/'}><IoIosHome className="inline text-xl mr-3"/>HOMEPAGE </Link>
                </span>
    
          </div>
        
          
        </div>
      </div>
      
    </div>
  );
};

export default DashboardLayout;
