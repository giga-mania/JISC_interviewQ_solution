import {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {AuthContext} from "../context/authContext.jsx";

const Nav = () => {
    const {logOut} = useContext(AuthContext)

    return (
        <div css={{
            width: "100%",
            height: "60px",
            border: "1px solid gray",
            display: "flex",
            justifyContent: "space-around",
            paddingTop: "10px",
            '> button': {
                height: "30px"
            }
        }}>
            <NavLink to="profile/results">Questions</NavLink>
            <br/>
            <br/>
            <NavLink to="profile/answer">Answer</NavLink>
            <button onClick={logOut}>LogOut</button>
        </div>
    );
};

export default Nav;