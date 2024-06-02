import { Outlet } from "react-router-dom";
import Navigation from "../component/shared/navigation";

function MainLayout() {
    return ( 
        <div>
            <Navigation/>
            <Outlet/>
        </div>
     );
}

export default MainLayout;