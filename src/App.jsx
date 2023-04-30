import {useContext, useEffect} from "react";
import {Navigate, Outlet, Route, Routes, useNavigate} from "react-router-dom";

import {AuthContext, AuthContextProvider} from "./context/authContext.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Layout from "./components/Layout.jsx";
import Nav from "./components/Nav.jsx";


const ProtectedRoute = ({user, redirectPath = "/login", children}) => {
    if (!user) {
        return <Navigate to={redirectPath} replace/>
    }

    return children ? children : <Outlet/>
}


function App() {
    const {user, logOut} = useContext(AuthContext)
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (user) {
    //         navigate("/profile")
    //     }
    // }, [user])


    return (
        <AuthContextProvider>
            <Routes>
                <Route path='signup' element={<Signup/>}/>
                <Route path='login' element={<Login/>}/>
                <Route element={<ProtectedRoute redirectPath={"/login"} user={user}/>}>
                    <Route element=
                               {
                                   <Layout>
                                       <Nav/>
                                   </Layout>
                               }>
                        <Route path="profile" element={<Profile/>}/>
                        <Route path="dashboard" element={<Dashboard/>}/>
                    </Route>
                </Route>
                <Route path='*' element={<h1>Page not found!</h1>}/>
            </Routes>
        </AuthContextProvider>
    )
}

export default App
