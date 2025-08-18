import { jwtDecode } from "jwt-decode";
import SignIn from "../../Components/Authenticate/SignIn/signin";
import SignUp from "../../Components/Authenticate/SignUp/signup";
import "./authenticate.css"
import { useEffect } from "react";
import { useNavigate, type NavigateFunction } from "react-router";

export default function Authenticate(){

    const navigate: NavigateFunction = useNavigate()
    
    const token = localStorage.getItem("token")
    
    useEffect(() => {
        token
        &&
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/id"].join(""), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        email: (jwtDecode(token) as any).username
                    })
                })
        .then(res => {
            (res.status.toString().startsWith("2")) && navigate("/operations")
        })
        }
    , [])
        

    return <div className="authenticate">
        <SignUp />
        <SignIn />   
    </div>
}