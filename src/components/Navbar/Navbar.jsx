import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navlinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? " active bg-primary px-3 py-2 text-base-100 rounded-xl" : "hover:bg-primary px-3 py-2 hover:text-base-100 transition duration-200 rounded-xl"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? " active bg-primary px-3 py-2 text-base-100 rounded-xl" : "hover:bg-primary px-3 py-2 hover:text-base-100 transition duration-200 rounded-xl"
        }
      >
        All Properties
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? " active bg-primary px-3 py-2 text-base-100 rounded-xl" : "hover:bg-primary px-3 py-2 hover:text-base-100 transition duration-200 rounded-xl"
        }
      >
        Dashboard
      </NavLink>
    </>
  );
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-white shadow-md shadow-blue-100">
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
          <div className="flex-1 px-2 mx-2">
            <img src="/assets/home/logoMain.png" alt="logo" className="w-56" />
          </div>
          <div className="flex-none hidden  md:block">
            <div className="menu menu-horizontal justify-center items-center gap-2 font-semibold ">
              {/* Navbar menu content here */}
              {navlinks}
              <button className="button button-1 px-6 py-2 rounded-xl text-xs hover:border-primary">LOGIN</button>
            
            </div>
          </div>
        </div>
        {/* Page content here */}
      
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 w-80 min-h-full bg-gradient-to-br from-primary to-blue-100 text-white  text-center justify-center items-center text-xl gap-6">
          {/* Sidebar content here */}
          {
            navlinks
          }
          <button className="w-fit btn button button-1 px-6 py-2 rounded-xl hover:text-white btn-ghost">LOGIN</button>
              
        </div>
      </div>
    </div>
  );
};

export default Navbar;
