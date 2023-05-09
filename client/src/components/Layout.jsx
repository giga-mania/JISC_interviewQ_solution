import React from 'react';
import {Outlet} from "react-router-dom";

const Layout = ({children}) => {
    return (
        <div>
            {children}
            <Outlet/>
        </div>
    );
};

export default Layout;