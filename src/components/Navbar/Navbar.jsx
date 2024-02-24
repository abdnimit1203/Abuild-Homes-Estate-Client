import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import {  MdMail } from "react-icons/md";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaUser, FaUserSecret } from "react-icons/fa";
import { RiShieldStarFill } from "react-icons/ri";
import { RiAdminFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { setTheme } from "../../..";
import LogOutButton from "../Buttons/LogOutButton";

const Navbar = () => {
  const { user } = useAuth();
  // console.log(user);
  const axiosPublic = useAxiosPublic();

  // user role fetching
  const { data, isLoading } = useQuery({
    queryKey: ["user-key", user],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/users?email=${user?.email}`);
      return res.data;
    },
  });

  

  // theme changing with local storage
  const [isdark, setIsdark] = useState(
    JSON.parse(localStorage.getItem("isdark"))
  );
  
  useEffect(() => {
    localStorage.setItem("isdark", JSON.stringify(isdark));
  }, [isdark]);
  const toggleTheme = (isdark) => {
    if (isdark) {
      console.log("theme changing : dark");
      setTheme("dark");
    } else {
      console.log("theme changing : Light");
      setTheme("mytheme");
    }
  };

  const navlinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-primary px-3 py-2 text-base-100 rounded-xl"
            : "hover:bg-primary px-3 py-2 hover:text-base-100 transition duration-200 rounded-xl"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/all-properties"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-primary px-3 py-2 text-base-100 rounded-xl"
            : "hover:bg-primary px-3 py-2 hover:text-base-100 transition duration-200 rounded-xl"
        }
      >
        All Properties
      </NavLink>
      <NavLink
        to="/dashboard/profile"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-primary px-3 py-2 text-base-100 rounded-xl"
            : "hover:bg-primary px-3 py-2 hover:text-base-100 transition duration-200 rounded-xl flex items-center"
        }
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          <p>
            {data[0]?.role === null && ""}
            {data[0]?.role === "admin" && (
              <RiAdminFill className="inline mr-2" />
            )}
            {data[0]?.role === "agent" && (
              <FaUserSecret className="inline mr-2" />
            )}
            {data[0]?.role === "user" && <FaUser className="inline mr-2" />}
          </p>
        )}
        Dashboard
      </NavLink>
      <NavLink
        to="/career"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-primary px-3 py-2 text-base-100 rounded-xl"
            : "hover:bg-primary px-3 py-2 hover:text-base-100 transition duration-200 rounded-xl"
        }
      >
        Career
      </NavLink>
      <NavLink
        to="/about-us"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-primary px-3 py-2 text-base-100 rounded-xl"
            : "hover:bg-primary px-3 py-2 hover:text-base-100 transition duration-200 rounded-xl"
        }
      >
        About Us
      </NavLink>
    </>
  );
  return (
    <div className="drawer bg-base-200  mb-6">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content w-[90%]  flex flex-col">
        {/* Navbar */}
        <div className="fixed top-0 z-10 w-full navbar bg-base-200 p-0 px-[5%] glass shadow-blue-400 shadow-md">
          <div className="flex-none  md:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          {isdark ? (
            <div className="flex-1 px-2 mx-2">
              <Link to={"/"}>
                <img
                  src="/assets/home/logoDark.png"
                  alt="logo"
                  className="w-52 rounded-3xl"
                />
              </Link>
            </div>
          ) : (
            <div className="flex-1 px-2 mx-2">
              <Link to={"/"}>
                <img
                  src="/assets/home/logoMain.png"
                  alt="logo"
                  className="w-52"
                />
              </Link>
            </div>
          )}
          <div className="flex-none hidden  md:block">
            <div className="menu menu-horizontal justify-center items-center gap-2 font-semibold ">
              {/* Navbar menu content here */}

              {navlinks}
            </div>
          </div>
          <div>
            {user ? (
              <div className="avatar online dropdown dropdown-end w-12 mx-3">
                <div
                  tabIndex={0}
                  role="button"
                  className="  rounded-full border-2 border-primary"
                >
                  <img
                    src={
                      user?.photoURL
                        ? user.photoURL
                        : "https://i.ibb.co/5x6DN2n/blank-dp.png"
                    }
                    alt="user-photo"
                    className="w-full"
                  />
                </div>
                <ul
                 
                  className="dropdown-content z-[1] menu p-4 py-6 shadow bg-base-100 rounded-box min-w-max border-secondary border-4 space-y-3"
                >
                  {isLoading ? (
                    <p>Loading..</p>
                  ) : (
                    data[0]?.role !== "user" && (
                      <>
                        <p className="text-center font-bold">
                          <RiShieldStarFill className="inline text-xl text-secondary" />
                          ROLE :{" "}
                          <span className="uppercase btn-secondary btn btn-xs text-white">
                            {data[0]?.role}
                          </span>
                        </p>
                        <hr className="mt-3" />
                      </>
                    )
                  )}

                  {user?.displayName && (
                    <>
                      <p className="font-semibold text-center">
                        {user?.displayName}
                      </p>
                    </>
                  )}

                  <p>
                    <MdMail className="inline text-xl text-secondary" />{" "}
                    {user?.email}
                  </p>
                 <LogOutButton/>
                </ul>
                
              </div>
            ) : (
              <Link to={"/login"}>
                <button className="button button-1 px-6 py-2 rounded-xl text-xs hover:border-primary">
                  LOGIN
                </button>
              </Link>
            )}
            <div className="ml-2">
              <label className="cursor-pointer grid place-items-center">
                <input
                  type="checkbox"
                  value="dark"
                  checked={isdark}
                  onChange={() => {
                    setIsdark(!isdark);
                    toggleTheme(!isdark);
                  }}
                  className="toggle theme-controller bg-primary row-start-1 col-start-1 col-span-2 hover:bg-primary"
                />
                <svg
                  className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <svg
                  className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </label>
            </div>
          </div>
        </div>
        {/* Page content here */}
      </div>
      <div className="drawer-side z-10">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 w-80 min-h-full bg-gradient-to-br from-primary to-blue-100 text-white  text-center justify-center items-center text-xl gap-6">
          {/* Sidebar content here */}
          {navlinks}
          <div>
            {user ? (
              <LogOutButton/>
            ) : (
              <Link to={"/login"}>
                <button className="w-fit btn button button-1 px-6 py-2 rounded-xl hover:text-white btn-ghost">
                  LOGIN
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
