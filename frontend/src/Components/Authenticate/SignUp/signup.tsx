import InputLabel from "../../General/InputLabel";
import GreenBank from "../../../assets/greenbank.svg"
import "./signup.css"
import Company from "../../Company/company";
import { useNavigate } from "react-router";
import { useState, type ChangeEvent } from "react";
import type { IInputsWithThreeValues } from "../../../Interfaces/inputValues";

export default function SignUp(){
    const navigate : Function = useNavigate()

    const [inputValues, setInputValues] = useState<IInputsWithThreeValues>({
        input1: "",
        input2: "",
        input3: ""
    })

    function handleChange1(event: ChangeEvent<HTMLInputElement>){
        setInputValues({...inputValues, input1: (event.target as HTMLInputElement).value})
    }

    function handleChange2(event: ChangeEvent<HTMLInputElement>){
        setInputValues({...inputValues, input2: (event.target as HTMLInputElement).value})
    }

    function handleChange3(event: ChangeEvent<HTMLInputElement>){
        setInputValues({...inputValues, input3: (event.target as HTMLInputElement).value})
        // console.log(inputValues)
    }

    return <div className="signup">
    
            <Company 
            svg={GreenBank}
            length="75px"/>
    
            <span className="title">Sign Up</span>
    
            <div className="inputs">
                <InputLabel
                label="Mail"
                placeholder="Mail address"
                type="text"
                inputValue={inputValues.input1}
                handleChange={(e: ChangeEvent<HTMLInputElement>) => handleChange1(e)}
                />
                
                <InputLabel 
                label="Password"
                placeholder="Your password"
                type="text"
                inputValue={inputValues.input2}
                handleChange={(e: ChangeEvent<HTMLInputElement>) => handleChange2(e)}
                />
    
                <InputLabel 
                label="Confirm password"
                placeholder="Retype your password"
                type="text"
                inputValue={inputValues.input3}
                handleChange={(e: ChangeEvent<HTMLInputElement>) => handleChange3(e)}
                />
            </div>
            <button onClick={handleSignUp}>Sign up</button>
        </div>
}