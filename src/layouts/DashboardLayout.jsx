import { Link, NavLink, Outlet } from "react-router-dom";
import HeaderText from "../components/HeaderText/HeaderText";
import { FaRegUserCircle, FaUserSecret } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { MdReviews, MdSpaceDashboard } from "react-icons/md";
import {  BsBuildingExclamation, BsBuildingFillAdd, BsClipboardHeart, BsFillHousesFill } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";

import { IoIosHome } from "react-icons/io";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const {user,loading} = useAuth()
    const [role,isLoading] =useRole(user?.email);
    let headerText = ""
    let headerText2 = "DASHBOARD"
    if(!isLoading){

        if(role!== 'user'){
          headerText= role.toUpperCase()
        }
    }

    const userNavlinks =(
        <>
         <NavLink
        to="profile"
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
        to="profile"
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
    const adminNavlinks =(
        <>
         <NavLink
        to="/dashboard/agent-profile"
        className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold" : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
        }
      >
    <FaUserSecret  className="inline text-xl mr-3"/> Admin Profile
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
       {

        loading? 
        <div className="min-h-screen flex justify-center items-center" >
        <img
          src="/assets/home/loading2.png"
          alt="loader"
          className="motion-safe:animate-spin w-52 mx-auto "
        />
      </div>
        :
        <div className="drawer md:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="navbar btn-primary drawer-button md:hidden flex items-center text-center justify-center bg-primary text-white animate-pulse "
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
        

            <HeaderText headerText={headerText} headerText2={headerText2} />
           {
            isLoading? <span className="loading loading-ring w-32 mx-auto text-center "></span> :
            role === 'user'?userNavlinks:
                role === 'agent'? agentNavlinks: adminNavlinks
           }
            
            <hr  className="border-white"/>
          
                <span className="hover:bg-white py-2 px-3 hover:text-neutral transition duration-200  rounded-xl ">

                <Link to={'/'}><IoIosHome className="inline text-xl mr-3"/>HOMEPAGE </Link>
                </span>
    
          </div>
        
          
        </div>
      </div>
       }
      
      
    </div>
  );
};

export default DashboardLayout;
