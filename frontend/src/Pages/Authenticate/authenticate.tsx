import { jwtDecode } from "jwt-decode";
import SignIn from "../../Components/Authenticate/SignIn/signin";
import SignUp from "../../Components/Authenticate/SignUp/signup";
import { getNavigationStatusParameters } from "../Utils/getNavigationStateParameters";
import "./authenticate.css"
import { useEffect } from "react";
import { useNavigate, type NavigateFunction } from "react-router";

export default function Authenticate(){

    // const [navigate, _] = getNavigationStatusParameters()

    const navigate: NavigateFunction = useNavigate()
    
    useEffect(() => {
        const token = localStorage.getItem("token")
        token && navigate("/operations")
        // fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/id"].join(""), {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 "Authorization": `Bearer ${token}`
        //             },
        //             body: JSON.stringify({
        //                 email: (jwtDecode(token) as any).username
        //             })
        //         })
        // .then(res => {
        //             // (!res.status.toString().startsWith("2")) && navigate("/")
        //     (res.status.toString().startsWith("2")) && navigate("/operations")
        // })
    }, [])

    return <div className="authenticate">
        <SignUp />
        <SignIn />   
    </div>
}