import SignIn from "../../Components/Authenticate/SignIn/signin";
import SignUp from "../../Components/Authenticate/SignUp/signup";
import "../../style/variables.css"

export default function Authenticate(){
    return <div className="authenticate">
        <SignUp />
        <SignIn />   
    </div>
}