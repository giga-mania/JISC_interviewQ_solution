import {ReactElement} from 'react';
import {Outlet} from "react-router-dom";

type LayoutProps = {
    children: ReactElement
}

const Layout = ({children}: LayoutProps) => {
    return (
        <div>
            {children}
            <Outlet/>
        </div>
    );
};

export default Layout;