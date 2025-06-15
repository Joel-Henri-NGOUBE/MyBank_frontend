import InputLabel from "../../General/InputLabel";
import WhiteBank from "../../../assets/whitebank.svg"
import "./signin.css"

export default function SignIn(){
    return <div className="signin">

        <div className="company">
            <img src={WhiteBank} alt="MyBank" width="75px"/>
            <h1>MyBank</h1>
        </div>

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