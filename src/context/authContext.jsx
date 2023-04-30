import React, {useState} from "react";


const initialState = {
    user: localStorage.getItem("user"),
    setAuthUser: () => {},
    logOut: () => {}
}
const AuthContext = React.createContext(initialState)
AuthContext.displayName = "AuthContext"

const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState()

    const setAuthUser = (user) => {
        setUser(JSON.parse(user))
        localStorage.setItem("user", user)
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