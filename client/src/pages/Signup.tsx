import {useContext} from "react";
import {FormGroup, Input} from "../components/lib.jsx"
import {useForm, FieldValues} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";

import {AuthContext} from "../context/authContext.jsx";

const Signup = () => {
    const authContext = useContext(AuthContext)
    const {handleSubmit, register} = useForm()
    const navigate = useNavigate()

    const formSubmitHandler = async (formData: FieldValues) => {
        const response = await fetch('http://localhost:8000/api/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
        const newUser = await response.json()
        if(response.ok) {
            console.log("that was okay")
            const response = await fetch('http://localhost:8000/api/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...newUser, password: formData.password})
            })
            const userData = await response.json()
            if(response.ok) {
                authContext.setAuthUser(userData)
                navigate("../results", {replace: true})
            }
        }
    }

    return (
        <form
            onSubmit={handleSubmit(formSubmitHandler)}
            css={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                '> div': {
                    margin: '10px auto',
                    width: '100%',
                    maxWidth: '300px',
                },
                "#input-error-message": {
                    color: "#8e0202",
                }
            }}>
            <div css={{
                padding: "20px",
                border: "1px solid gray",
            }}>
                <FormGroup>
                    <label htmlFor="username">username</label>
                    <Input id="username" type="text" {...register("username", {required: true})}/>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="email">email</label>
                    <Input id="email" type="email" {...register("email", {required: true})}/>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="password">password</label>
                    <Input id="password" type="password" {...register("password", {required: true})}/>
                </FormGroup>
                <div css={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <button>Sign up</button>
                    <Link to="/login">
                        Log in
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default Signup;