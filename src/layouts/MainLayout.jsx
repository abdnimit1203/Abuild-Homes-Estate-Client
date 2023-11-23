import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            <div>
                Navbar
            </div>
            <div>
                <Outlet/>
            </div>
            <div>
                Footer
            </div>
        </div>
    );
};

export default MainLayout;