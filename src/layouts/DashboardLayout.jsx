import { Link, NavLink, Outlet } from "react-router-dom";
import HeaderText from "../components/HeaderText/HeaderText";
import { FaRegUserCircle, FaUserSecret } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { MdReviews, MdSpaceDashboard } from "react-icons/md";
import {  BsBuildingExclamation, BsBuildingFillAdd, BsClipboardHeart, BsFillHousesFill } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";

import { IoIosHome } from "react-icons/io";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
    const [userRole,isLoading] =useRole();
    console.log(userRole);

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
        to="/dashboard/wishlist"
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
        to="/dashboard/my-reviews"
        className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold" : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
        }
      >
       <MdReviews className="inline text-xl mr-3"/> My Reviews
      </NavLink>
        </>
    )
    const agentNavlinks =(
        <>
         <NavLink
        to="/dashboard/agent-profile"
        className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold" : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
        }
      >
    <FaUserSecret  className="inline text-xl mr-3"/> Agent Profile
      </NavLink>
      <NavLink
        to="/dashboard/add-property"
        className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold" : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
        }
      >
        <BsBuildingFillAdd  className="inline text-xl mr-3"/>Add Property
      </NavLink>
      <NavLink
        to="/dashboard/added-properties"
        className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold" : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
        }
      >
        <BsFillHousesFill  className="inline text-xl mr-3"/>My Added Properties
      </NavLink>
      <NavLink
        to="/dashboard/sold-properties"
        className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold" : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
    }
      >
       <GrMoney  className="inline text-xl mr-3"/>My Sold Properties
      </NavLink>
      <NavLink
        to="/dashboard/requested-properties"
        className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold" : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
        }
      >
       <BsBuildingExclamation  className="inline text-xl mr-3"/> Requested Properties
      </NavLink>
        </>
    )
  return (
    <div>
       
      <div className="drawer md:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="navbar btn-primary drawer-button md:hidden flex items-center text-center justify-center"
          >
            <MdSpaceDashboard className="text-xl"/> Open DASHBOARD
          </label>
          <Outlet></Outlet>
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
                agentNavlinks
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
