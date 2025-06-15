import InputLabel from "../../General/InputLabel";
import GreenBank from "../../../assets/greenbank.svg"
import "./signup.css"
import Company from "../../Company/company";

export default function SignUp(){
    return <div className="signup">
    
            <Company 
            svg={GreenBank}
            length="75px"/>
    
            <span className="title">Sign Up</span>
    
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
    
                <InputLabel 
                label="Confirm password"
                placeholder="Retype your password"
                type="text"
                direction="horizontal"
                />
            </div>
    
            <button>Sign up</button>
        </div>
}