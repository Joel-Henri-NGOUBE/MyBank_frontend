import InputLabel from "../../General/InputLabel";
import WhiteBank from "../../../assets/whitebank.svg"
import "./signin.css"
import Company from "../../Company/company";
import { useNavigate } from "react-router";
import type { IInputsWithTwoValues } from "../../../Interfaces/inputValues";
import { useState, type ChangeEvent } from "react";

export default function SignIn(){

    const navigate : Function = useNavigate()

    const [inputValues, setInputValues] = useState<IInputsWithTwoValues>({
            input1: "",
            input2: ""
    })

    function handleChange1(event: ChangeEvent<HTMLInputElement>){
        setInputValues({...inputValues, input1: (event.target as HTMLInputElement).value})
    }

    function handleChange2(event: ChangeEvent<HTMLInputElement>){
        setInputValues({...inputValues, input2: (event.target as HTMLInputElement).value})
    }

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

        </div>

        <button onClick={() => navigate("/operations")}>Sign in</button>
    </div>
}