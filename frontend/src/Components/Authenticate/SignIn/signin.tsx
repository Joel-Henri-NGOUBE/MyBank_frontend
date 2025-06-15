import InputLabel from "../../General/InputLabel";
import WhiteBank from "../../../assets/whitebank.svg"
import "./signin.css"
import Company from "../../Company/company";

export default function SignIn(){
    return <div className="signin">

        <Company 
            svg={WhiteBank}
            length="75px"/>

        <span className="title">Sign In</span>

        <div className="inputs">
            <InputLabel 
            label="Mail"
            placeholder="Mail adress"
            type="text"
            direction="horizontal"
            />

            <InputLabel 
            label="Password"
            placeholder="Your password"
            type="text"
            direction="horizontal"
            />

        </div>

        <button>Sign in</button>
    </div>
}