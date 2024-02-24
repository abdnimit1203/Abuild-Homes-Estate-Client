import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useEffect } from "react";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {

    // manual helmet functionality handle
    const loc = useLocation();
    //   console.log(loc);
      useEffect(() => {
        if (loc.pathname === "/") {
          document.title = `ABuild Homes`;
        } else {
          document.title = `ABuild Homes | ${
            loc.pathname.replace("/", "").charAt(0).toUpperCase() +
            loc.pathname.slice(2)
          }`;
        }
        if (loc.state) {
          document.title = `${loc.state}`;
        }
      }, [loc]);
    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div className="w-[90%] mx-auto mt-[130px]">
                <Outlet/>
            </div>
            
                <Footer/>
             
        </div>
    );
};

export default MainLayout;