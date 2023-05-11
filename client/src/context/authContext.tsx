import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


type User = {
    id: number,
    username: string,
    email: string,
    accessToken: string,
    hasAnswered: boolean,
    isAdmin: boolean
}

type AuthContextType = {
    user: User | null,
    setAuthUser: (user: User) => void,
    logOut: () => void
}

type AuthContextProviderProps = {
    children: React.ReactNode
}


const initialState: AuthContextType = {
    user: JSON.parse(localStorage.getItem("user")!),
    setAuthUser: () => {},
    logOut: () => {}
}


const AuthContext = React.createContext(initialState)
AuthContext.displayName = "AuthContext"

const AuthContextProvider = ({children}: AuthContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user")!)
        if (user) {
            setAuthUser(user)
            navigate("/answer-questions")
        }
    }, [])
    
    const setAuthUser = (user: User) => {
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