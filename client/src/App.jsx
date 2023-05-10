import {useContext} from "react";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";

import {AuthContext} from "./context/authContext.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Survey from "./pages/Survey.jsx";
import Ratings from "./pages/Ratings.jsx";
import Admin from "./pages/Admin.jsx";
import Layout from "./components/Layout.jsx";
import Nav from "./components/Nav.jsx";


const ProtectedRoute = ({user = {}, redirectPath = "/login", children}) => {
    if (!user) return <Navigate to={redirectPath} replace/>

    return children ? children : <Outlet/>
}



function App() {
    const {user, logOut, setAuthUser} = useContext(AuthContext)

    return (
        <Routes>
            <Route path='signup' element={<Signup/>}/>
            <Route path='login' element={<Login/>}/>
            <Route element={<ProtectedRoute redirectPath={"/login"} user={user}/>}>
                <Route element=
                           {
                               <Layout>
                                   <Nav user={user}/>
                               </Layout>
                           }>
                    <Route path="answer-questions" element={<Survey user={user}/>}/>
                    <Route path="results" element={<Ratings user={user}/>}/>
                    {
                        user?.isAdmin && <Route path="add-trainer" element={<Admin/>}/>
                    }
                </Route>
            </Route>
            <Route path='*' element={<h1>Page not found!</h1>}/>
        </Routes>
    )
}

export default App
