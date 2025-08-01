import SignIn from "../../Components/Authenticate/SignIn/signin";
import SignUp from "../../Components/Authenticate/SignUp/signup";
import "./authenticate.css"
import { useEffect } from "react";
import { useNavigate, type NavigateFunction } from "react-router";

export default function Authenticate(){

    const navigate: NavigateFunction = useNavigate()
    
    useEffect(() => {
        const token = localStorage.getItem("token")
        token &&
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/login_check"].join(""), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }})
        .then(res => (res.status.toString().startsWith("2")) && navigate("/operations"))
    }, [])

        

    return <div className="authenticate">
        <SignUp />
        <SignIn />   
    </div>
}