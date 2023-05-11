import {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {AuthContext} from "../context/authContext.jsx";
import {User} from "../context/authContext.jsx";


type NavProps = {
    user: User | null
}


const Nav = ({user}: NavProps) => {
    const {logOut} = useContext(AuthContext)
    return (
        <div css={{
            width: "100%",
            height: "60px",
            border: "1px solid green",
            display: "flex",
            justifyContent: "space-around",
            paddingTop: "10px",
            '> button': {
                height: "30px"
            }
        }}>
            <NavLink to="/results">Results</NavLink>
            <br/>
            <br/>
            <NavLink to="answer-questions">{user?.hasAnswered ? "Reset Submission" : "Answer questions"}</NavLink>
            {
                user?.isAdmin &&  <NavLink to="add-trainer">Add trainer</NavLink>
            }
            <h1>{user?.username}</h1>
            <button onClick={logOut}>LogOut</button>
        </div>
    );
};

export default Nav;