import SignIn from "../../Components/Authenticate/SignIn/signin";
import SignUp from "../../Components/Authenticate/SignUp/signup";
import "./authenticate.css"
import { useEffect } from "react";
import { useNavigate, type NavigateFunction } from "react-router";

export default function Authenticate(){

    const navigate: NavigateFunction = useNavigate()
    
    useEffect(() => {
        const token = localStorage.getItem("token")
        token && navigate("/operations")
    }, [])

    return <div className="authenticate">
        <SignUp />
        <SignIn />   
    </div>
}