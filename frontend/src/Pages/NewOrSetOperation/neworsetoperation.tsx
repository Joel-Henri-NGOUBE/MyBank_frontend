import { useNavigate, useParams, type NavigateFunction } from "react-router";
import InputLabel from "../../Components/General/InputLabel";
import InputSelect from "../../Components/General/InputSelect";
import Header from "../../Components/Header/header";
import "./neworsetoperation.css"
import { useEffect, useState, type ChangeEvent } from "react";
import type { IInputsWithFourValues } from "../../Interfaces/inputValues";
import { jwtDecode } from "jwt-decode";
import type { IOperation } from "../../Interfaces/operation";

export default function NewOrSetOperation(){

    const [id, setId] = useState<number>(0)

    const navigate: NavigateFunction = useNavigate()

    const token = localStorage.getItem("token")

    useEffect(() => {
        token ?
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/id"].join(""), {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            email: (jwtDecode(token) as any).username
                        })
                    })
        .then(res => {
            (!res.status.toString().startsWith("2")) && navigate("/");
        return res.json()
        })
        .then((res: {id: number}) => setId(res.id))
        :
        navigate("/")
    }, [])

    const operationId = "id" in useParams() ? (useParams() as {id: string}).id : null;

    useEffect(() => {
        (id && operationId) &&
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/users/", id, "/operations/", operationId].join(""), {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => {
            return res.status === 200 && res.json()
        })
        .then((res: IOperation) => {
            let capitalizedCategory = res.category.toLowerCase()
            capitalizedCategory = capitalizedCategory[0].toUpperCase() + capitalizedCategory.substring(1)
            setInputValues({
                input1: res.label,
                input2: res.amount.toString(),
                input3: res.type.toLowerCase(),
                input4: capitalizedCategory,
            })
        })
    }, [id, operationId])

    const [inputValues, setInputValues] = useState<IInputsWithFourValues>({
            input1: "",
            input2: "",
            input3: "income",
            input4: "Salary"
    })

    const types: string [] = ["income", "expense"]
    const categories: string [] = [
        "Salary",
        "Tax",
        "Subscription",
        "Payment",
        "Courses",
        "Allocation",
        "AutoMoto",
        "Deposit",
        "Withdrawal",
        "Cheque",
        "Loan",
        "Housing",
        "Alimony",
        "Refund",
        "Health",
        "Transfer Issued",
        "Transfer Received",
        "Transport",
        "Gift",
        "Education",
        "Leisure",
        "Saving",
    ]

    function handleChange1(event: ChangeEvent<HTMLInputElement>){
        setInputValues({...inputValues, input1: (event.target as HTMLInputElement).value})
    }

    function handleChange2(event: ChangeEvent<HTMLInputElement>){
        setInputValues({...inputValues, input2: (event.target as HTMLInputElement).value})
    }

    function handleChange3(event: ChangeEvent<HTMLSelectElement>){
        setInputValues({...inputValues, input3: (event.target as HTMLSelectElement).value})
    }

    function handleChange4(event: ChangeEvent<HTMLSelectElement>){
        setInputValues({...inputValues, input4: (event.target as HTMLSelectElement).value})
    }

    function createOperation(inputValues: IInputsWithFourValues, navigate: Function){
        !operationId
        ?
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/users/", id, "/operations"].join(""), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        label: inputValues.input1,
                        amount: parseFloat(parseFloat(inputValues.input2).toFixed(2)),
                        type: inputValues.input3.toUpperCase(),
                        category: inputValues.input4.toUpperCase()
                    })
                })
        .then(res => {
            res.status === 200 && navigate()
        })
        :
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/users/", id, "/operations/", operationId].join(""), {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/merge-patch+json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        label: inputValues.input1,
                        amount: parseFloat(parseFloat(inputValues.input2).toFixed(2)),
                        type: inputValues.input3.toUpperCase(),
                        category: inputValues.input4.toUpperCase()
                    })
                })
        .then(res => {
            res.status === 200 && navigate()
        })
    }
    
    return <div className="neworsetoperation">
        <Header />

        <div className="page">
            <h3>New operation</h3>

            <div className="inputs">
                <InputLabel 
                label="Label"
                type="text"
                placeholder="Name your operation"
                inputValue={inputValues.input1}
                handleChange={(e: ChangeEvent<HTMLInputElement>) => handleChange1(e)}
                />

                <InputLabel 
                label="Amount"
                type="number"
                placeholder="1234.567"
                inputValue={inputValues.input2}
                handleChange={(e: ChangeEvent<HTMLInputElement>) => handleChange2(e)}
                />

                <InputSelect
                label="Type"
                options={types}
                inputValue={inputValues.input3}
                handleChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange3(e)}
                />

                <InputSelect
                label="Category"
                options={categories}
                inputValue={inputValues.input4}
                handleChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange4(e)} 
                />

            </div>

            <div className="buttons">
                <button onClick={() => navigate("/operations", {state: {token: token}})}>Get back to operations</button>
                <button onClick={() => createOperation(inputValues, () => navigate("/operations"))}>Save operation</button>
            </div>

        </div>

    </div>
}