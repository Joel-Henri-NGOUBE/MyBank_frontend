import InputLabel from "../../General/InputLabel";
import GreenBank from "../../../assets/greenbank.svg"
import "./signup.css"
import Company from "../../Company/company";
import { useNavigate, type NavigateFunction } from "react-router";
import { useState, type ChangeEvent } from "react";
import type { IInputsWithThreeValues } from "../../../Interfaces/inputValues";
import type { ISignup } from "../../../Interfaces/APIResponses";
// import process from "process";
export default function SignUp(){

    const [inputValues, setInputValues] = useState<IInputsWithThreeValues>({
        input1: "",
        input2: "",
        input3: ""
    })

    const [response, setResponse] = useState<ISignup>({
        code: 0,
        message: ""
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

    function handleSignUp(inputValues: IInputsWithThreeValues){
        // console.log(process)
        // console.log(`${process.env}`)
        // console.log(`${process}`)
        console.log(import.meta.env.VITE_APP)
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/signup"].join(""), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: inputValues.input1,
                password: inputValues.input2
            })
        })
        .then(res => res.json())
        .then((res: ISignup) => {
            setResponse(res)
        })
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
            <button onClick={() => handleSignUp(inputValues)}>Sign up</button>
        </div>
}