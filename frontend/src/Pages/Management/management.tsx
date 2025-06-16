import Header from "../../Components/Header/header";
import "./management.css"

export default function Management(){
    return <div className="management">
        <Header />

        <div className="page">
            {/* <div> */}
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
            {/* </div> */}
        </div>
    </div>
}