import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


const initialState = {
    user: localStorage.getItem("user"),
    setAuthUser: () => {
    },
    logOut: () => {
    }
}
const AuthContext = React.createContext(initialState)
AuthContext.displayName = "AuthContext"

const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            setAuthUser(user)
            navigate("/answer-questions")
        }
    }, [])


    const setAuthUser = (user) => {
        setUser(user)
        localStorage.setItem("user", JSON.stringify(user))
    }

    const logOut = () => {
        setUser(null)
        localStorage.removeItem("user")
    }


    const value = {
        user,
        setAuthUser,
        logOut
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export {AuthContextProvider, AuthContext}