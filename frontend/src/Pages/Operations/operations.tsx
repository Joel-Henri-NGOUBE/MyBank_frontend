import Header from "../../Components/Header/header";
import Operation from "../../Components/Operations/operation";
import Tablist from "../../Components/TabList/tablist";
import type { IOperation } from "../../Interfaces/operation";
import "./operations.css"
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { categories } from "../../Interfaces/categories";
import { useNavigate, type NavigateFunction } from "react-router";
import { slideToAll, slideToCategories, slideToExpenses, slideToIncomes } from "./Utils/operationsPage";

export default function Operations(){

    const [operations, setOperations] = useState<IOperation[]>([])

    const [operationsDisplayed, setOperationsDisplayed] = useState<IOperation[]>([])

    const [id, setId] = useState<number>(0)

    const navigate: NavigateFunction = useNavigate()

    const token = localStorage.getItem("token")

    // Getting the id to verify is the current user is authenticated

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
        : navigate("/")
    }, [])

    // Getting all the operations of the authenticated user
    useEffect(() => {
        id &&
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/users/", id,"/operations/"].join(""), {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                })
        .then(res => res.json())
        .then((res: any) => {
            setOperations(res.member)
            setOperationsDisplayed(res.member)
        })
    }, [id])

    /**
     * Deletes an operation
     * @param operationId The id of an operation
     */
    function handleDelete(operationId: number){
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/users/", id, "/operations/", operationId].join(""), {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        setOperations(operations.filter(op => op.id !== operationId))
        setOperationsDisplayed(operations.filter(op => op.id !== operationId))
    }

    return <div className="operations">
        <Header />
        <div className="page">
            <span className="page-title">Balance</span>
            <span className="balance" 
                style={operations.reduce((acc, cur) => cur.type === "INCOME" ? acc + cur.amount : acc - cur.amount, 0) < 0 ? {color: "var(--negative-red)"} : {color: ""}}> 
                    {operations.reduce((acc, cur) => cur.type === "INCOME" ? acc + cur.amount : acc - cur.amount, 0).toFixed(2)} €
            </span>
            <div className="sliding">
                <Tablist 
                    tabs={[{tab: "all", onclick: () => slideToAll()}, {tab: "incomes", onclick: () => slideToIncomes()}, {tab: "expenses", onclick: () => slideToExpenses()}, {tab: "categories", onclick: () => slideToCategories()}]}
                />
                <div className="slider">
                    <div className="operations-wrapper">

                        <div className="all">
                            {operations.map((op, index) => 
                                <Operation 
                                    operation={op}
                                    operationId={op.id}
                                    handleDelete={() => handleDelete(op.id)}
                                    key={index}
                                />
                            )}
                        </div>

                        <div className="incomes">
                            {operations.filter(op => op.type === "INCOME").map((op, index) => 
                                <Operation 
                                    operation={op}
                                    operationId={op.id}
                                    handleDelete={() => handleDelete(op.id)}
                                    key={index}
                                />
                            )}
                        </div>

                        <div className="expenses">
                            {operations.filter(op => op.type === "EXPENSE").map((op, index) => 
                                <Operation 
                                    operation={op}
                                    operationId={op.id}
                                    handleDelete={() => handleDelete(op.id)}
                                    key={index}
                                />
                            )}
                        </div>

                        <div className="categories">
                            <div className="sub">
                                {categories.map((c, index) => 
                                    <span className="category" key={index} onClick={() => setOperationsDisplayed(operations.filter(op => op.category === c))}>{c}</span>
                                )}      
                            </div>
                            <div>
                                {operationsDisplayed.map((op, index) => 
                                    <Operation 
                                        operation={op}
                                        operationId={op.id}
                                        handleDelete={() => handleDelete(op.id)}
                                        key={index}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="buttons">
                <button onClick={() => navigate("/neworsetoperation")}>Add new operation</button>
                <button onClick={() => navigate("/statistics")}>Access statistics</button>
            </div>
        </div>
        </div>
}