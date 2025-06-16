import { useState } from "react";
import Header from "../../Components/Header/header";
import "./management.css"
import ManagementHeader from "../../Components/ManagementHeader/Managementheader";
import Tracking from "../../Components/ManagementComponents/Tracking/tracking";
import Investing from "../../Components/ManagementComponents/Investing/investing";
import Saving from "../../Components/ManagementComponents/Saving/saving";

export default function Management(){
    const [pages, setPages] = useState<boolean[]>([false, false, false, true])
    return <div className="management">
        <Header />

        {pages[0] && <div className="page">
                <p id="introduction">What are you using <span>MyBank</span> for today ?</p>
                <div className="actions">
                    <div className="tracking">
                        <span>Tracking</span>
                        <p>Just list and retrieve all the incomes and expenses</p>
                    </div>
                    <div className="investing">
                        <span>Investing</span>
                        <p>List and retrieve all the incomes and expenses and generate benefits from your balance </p>
                    </div>
                    <div className="saving">
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