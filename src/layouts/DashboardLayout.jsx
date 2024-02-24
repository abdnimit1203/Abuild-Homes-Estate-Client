import { Link, NavLink, Outlet } from "react-router-dom";
import HeaderText from "../components/HeaderText/HeaderText";
import { LiaUsersCogSolid } from "react-icons/lia";

import { FaRegUserCircle, FaUserSecret } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { MdRateReview, MdReviews } from "react-icons/md";
import { TiThMenuOutline } from "react-icons/ti";

import {
  BsBuildingExclamation,
  BsBuildingFillAdd,
  BsBuildingFillGear,
  BsClipboardHeart,
  BsFillHousesFill,
} from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import { RiAdminFill } from "react-icons/ri";
import { IoIosHome } from "react-icons/io";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import LogOutButton from "../components/Buttons/LogOutButton";
import { useEffect, useState } from "react";

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useRole(user?.email);
  let headerText = "";
  let headerText2 = "DASHBOARD";
  if (!isLoading) {
    if (role !== "user") {
      headerText = role.toUpperCase();
    }
  }
  //setting theme in Dashboard
   const [isdark, setIsdark] = useState(
    JSON.parse(localStorage.getItem("isdark"))
  );
  console.log(isdark)
  useEffect(() => {
    localStorage.setItem("isdark", JSON.stringify(isdark));
  }, []);



  const userNavlinks = (
    <>
      <NavLink
        to="profile"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
        }
      >
        <FaRegUserCircle className="inline text-xl mr-3" /> My Profile
      </NavLink>
      <NavLink
        to="/dashboard/wishlist"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
        }
      >
        <BsClipboardHeart className="inline text-xl mr-3" />
        WishList
      </NavLink>
      <NavLink
        to="/dashboard/property-bought"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
        }
      >
        <FaBuildingUser className="inline text-xl mr-3" /> Property Bought
      </NavLink>
      <NavLink
        to="/dashboard/my-reviews"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
        }
      >
        <MdReviews className="inline text-xl mr-3" /> My Reviews
      </NavLink>
    </>
  );
  const agentNavlinks = (
    <>
      <NavLink
        to="profile"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
        }
      >
        <FaUserSecret className="inline text-xl mr-3" /> Agent Profile
      </NavLink>
      <NavLink
        to="/dashboard/add-property"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
        }
      >
        <BsBuildingFillAdd className="inline text-xl mr-3" />
        Add Property
      </NavLink>
      <NavLink
        to="/dashboard/added-properties"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
        }
      >
        <BsFillHousesFill className="inline text-xl mr-3" />
        My Added Properties
      </NavLink>
      <NavLink
        to="/dashboard/sold-properties"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
        }
      >
        <GrMoney className="inline text-xl mr-3" />
        My Sold Properties
      </NavLink>
      <NavLink
        to="/dashboard/requested-properties"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
        }
      >
        <BsBuildingExclamation className="inline text-xl mr-3" /> Requested
        Properties
      </NavLink>
    </>
  );
  const fraudNavlinks = (
    <>
      <NavLink
        to="profile"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
        }
      >
        <RiAdminFill className="inline text-xl mr-3" /> Profile
      </NavLink>
      <p>Sorry! You do not access to any dashboard facility!(Because you were marked as fraud)</p>
      <p>Please contact admin!</p>
    </>
  );
  const adminNavlinks = (
    <>
      <NavLink
        to="profile"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
        }
      >
        <RiAdminFill className="inline text-xl mr-3" /> Admin Profile
      </NavLink>
      <NavLink
        to="/dashboard/manage-properties"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
        }
      >
        <BsBuildingFillGear className="inline text-xl mr-3" />
        Manage Properties
      </NavLink>
      <NavLink
        to="/dashboard/manage-users"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
        }
      >
        <LiaUsersCogSolid className="inline text-xl mr-3" />
        Manage Users
      </NavLink>
      <NavLink
        to="/dashboard/manage-reviews"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-base-100  px-3 py-2 text-neutral rounded-xl font-semibold"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl "
        }
      >
        <MdRateReview className="inline text-xl mr-3" />
        Manage reviews
      </NavLink>
    </>
  );
  return (
    <div>
      {loading ? (
        <div className="min-h-screen flex justify-center items-center">
          <img
            src="/assets/home/loading2.png"
            alt="loader"
            className="motion-safe:animate-spin w-52 mx-auto "
          />
        </div>
      ) : (
        <div className="drawer md:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

          <div className="drawer-content overflow-x-auto ">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-2"
              className="navbar  drawer-button md:hidden font-bold bg-primary pl-6 text-white"
            >
              <TiThMenuOutline  className="text-xl mr-2 " />  DASHBOARD
            </label>

            <Outlet></Outlet>
          </div>

          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <div
              className={
                role === "admin"
                  ? `menu gap-6 p-4 w-80 min-h-full bg-gradient-to-tr from-primary to-blue-200 text-black`
                  : role==="agent"? `menu gap-6 p-4 w-80 min-h-full bg-gradient-to-tr from-blue-400 via-purple-400 to-purple-500 border-r-2 border-[#ffffff56] text-black` :`menu gap-6 p-4 w-80 min-h-full bg-gradient-to-tr from-secondary to-accent text-black`
              }
            >
              {/* Sidebar content here */}

              <HeaderText
                headerText={headerText}
                headerText2={headerText2}
                emailText={user?.email}
              />

              {isLoading ? (
                <span className="loading loading-ring w-32 mx-auto text-center "></span>
              ) : role === "user" ? (
                userNavlinks
              ) : role === "agent" ? (
                agentNavlinks
              ) : role === "fraud" ? (
                fraudNavlinks
              ) : (
                adminNavlinks
              )}

              <hr className="border-white" />

              <Link
                to={"/"}
                className="hover:bg-white font-bold px-3 py-2 rounded-2xl transition delay-100 ease-in-out"
              >
                <IoIosHome className="inline text-xl  mr-3" />
                HOMEPAGE{" "}
              </Link>
              <LogOutButton/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
