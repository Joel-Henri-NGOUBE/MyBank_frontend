import InputLabel from "../../General/InputLabel";
import WhiteBank from "../../../assets/whitebank.svg"
import "./signin.css"
import Company from "../../Company/company";
import { useNavigate, type NavigateFunction } from "react-router";
import type { IInputsWithTwoValues } from "../../../Interfaces/inputValues";
import { useState, type ChangeEvent } from "react";
import type { TLogin} from "../../../Interfaces/APIResponses";
// import {env} from "process";
export default function SignIn(){

    const navigate : NavigateFunction = useNavigate()

    const [inputValues, setInputValues] = useState<IInputsWithTwoValues>({
            input1: "",
            input2: ""
    })

    const [response, setResponse] = useState<TLogin>({
        code: 0,
        message: ""
    })

    function handleChange1(event: ChangeEvent<HTMLInputElement>){
        setInputValues({...inputValues, input1: (event.target as HTMLInputElement).value})
    }

    function handleChange2(event: ChangeEvent<HTMLInputElement>){
        setInputValues({...inputValues, input2: (event.target as HTMLInputElement).value})
    }

    function handleSignIn(inputValues: IInputsWithTwoValues, navigate: Function){
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/login_check"].join(""), {
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
        .then((res: TLogin) => {
            setResponse(res);
            console.log(res);
            console.log("token" in res);
            if("token" in res){
                navigate();
            }
        })
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

        <button onClick={() => handleSignIn(inputValues, () => navigate("/operations"))}>Sign in</button>
    </div>
}