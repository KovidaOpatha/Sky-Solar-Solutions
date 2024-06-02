import { Outlet } from "react-router-dom";
import Navigation from "../component/shared/navigation";
import React from "react";

function rootLayout() {
    return ( 
        <main className="container">
            
            <Outlet/>
        </main>
     );
}

export default rootLayout;