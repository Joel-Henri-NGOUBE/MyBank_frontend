import InputLabel from "../../General/InputLabel";
import Bank from "../../../assets/bank.svg"

export default function SignIn(){
    return <div className="signin">

        <div className="company">
            <img src={Bank} alt="MyBank" width="75px"/>
            <h1>MyBank</h1>
        </div>

        <span className="title">SignIn</span>

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

        <button>SignIn</button>
    </div>
}