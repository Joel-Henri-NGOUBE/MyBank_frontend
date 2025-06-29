import InputLabel from "../../General/InputLabel";
import WhiteBank from "../../../assets/whitebank.svg"
import "./signin.css"
import Company from "../../Company/company";
import { useNavigate } from "react-router";

export default function SignIn(){

    const navigate : Function = useNavigate()

    return <div className="signin">

        <Company 
            svg={WhiteBank}
            length="75px"/>

        <span className="title">Sign In</span>

        <div className="inputs">
            <InputLabel 
            label="Mail"
            placeholder="Mail address"
            type="text"
            />

            <InputLabel 
            label="Password"
            placeholder="Your password"
            type="text"
            />

        </div>

        <button onClick={() => navigate("/operations")}>Sign in</button>
    </div>
}