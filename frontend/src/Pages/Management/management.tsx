import { useEffect, useState } from "react";
import Header from "../../Components/Header/header";
import "./management.css"
import Tracking from "../../Components/ManagementComponents/Tracking/tracking";
import Investing from "../../Components/ManagementComponents/Investing/investing";
import Saving from "../../Components/ManagementComponents/Saving/saving";
import { jwtDecode } from "jwt-decode";
import { useNavigate, type NavigateFunction } from "react-router";

export default function Management(){
    const [pages, setPages] = useState<boolean[]>([true, false, false, false])

    const navigate: NavigateFunction = useNavigate()

    const token = localStorage.getItem("token")

    // Getting the id to verify is the current user is authenticated

    useEffect(() => {
        token
        ?
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
            (!res.status.toString().startsWith("2")) && navigate("/")
        })
        :
        navigate("/")
        }
    , [])

    return <div className="management">
        <Header />

        {pages[0] && <div className="page">
                <p id="introduction">What are you using <span>MyBank</span> for today ?</p>
                <div className="actions">
                    <div className="tracking" onClick={() => setPages([false, true, false, false])}>
                        <span>Tracking</span>
                        <p>Just list and retrieve all the incomes and expenses</p>
                    </div>
                    <div className="investing" onClick={() => setPages([false, false, true, false])}>
                        <span>Investing</span>
                        <p>List and retrieve all the incomes and expenses and generate benefits from your balance </p>
                    </div>
                    <div className="saving" onClick={() => setPages([false, false, false, true])}>
                        <span>Saving</span>
                        <p>List and retrieve all the incomes and expenses and put some money aside from your balance</p>
                    </div>
                </div>
        </div>}

        {pages[1] && 
                    <Tracking
                        pages={pages}
                        setPages={setPages}
                    />}
        {pages[2] && 
                    <Investing
                        pages={pages}
                        setPages={setPages}
                    />}
        {pages[3] && 
                    <Saving
                        pages={pages}
                        setPages={setPages}
                    />}
    </div>
}