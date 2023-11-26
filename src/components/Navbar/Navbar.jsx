import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { MdLogout, MdMail } from "react-icons/md";

const Navbar = () => {
  const { user, logOut } = useAuth();
  console.log(user);
  const handleLogOut = ()=>{
    logOut()
    .then(
     
      toast("User has been logged out",{
        icon: <MdLogout/>,
        style:{
          background: "#ff92b4"
        }
      })
    )
  }
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
        to="/dashboard"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? " active bg-primary px-3 py-2 text-base-100 rounded-xl"
            : "hover:bg-primary px-3 py-2 hover:text-base-100 transition duration-200 rounded-xl"
        }
      >
        Dashboard
      </NavLink>
    </>
  );
  return (
    <div className="drawer bg-white shadow-md shadow-blue-100 mb-6">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content w-[90%] mx-auto flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar  bg-white ">
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
            <img src="/assets/home/logoMain.png" alt="logo" className="w-52" />
          </div>
          <div className="flex-none hidden  md:block">
            <div className="menu menu-horizontal justify-center items-center gap-2 font-semibold ">
              {/* Navbar menu content here */}
              {navlinks}
            </div>
          </div>
          <div>
            {user ? (
              <div className="avatar online dropdown dropdown-end">
                <div tabIndex={0} className="w-12 ml-4 rounded-full drop">
                  <img
                    src={
                      user?.photoURL
                        ? user?.photoURL
                        : "https://i.ibb.co/5x6DN2n/blank-dp.png"
                    }
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-4 py-6 shadow bg-base-100 rounded-box w-52 border-secondary border-4 space-y-3"
                >{
                  user?.displayName &&
                  <>
                  
                
                 <p className="font-semibold text-center">{user?.displayName}</p>
                  </>
                }
                 
                 <p><MdMail className="inline text-xl text-secondary"/> {user?.email}</p>
                 <button onClick={handleLogOut} className="btn btn-secondary w-full text-white btn-sm">LOG OUT</button>
                </ul>
              </div>
            ) : (
              <Link to={"/login"}>
                <button className="button button-1 px-6 py-2 rounded-xl text-xs hover:border-primary">
                  LOGIN
                </button>
              </Link>
            )}
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
              <button onClick={handleLogOut} className="btn btn-secondary w-full text-white btn-sm">LOG OUT</button>
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
