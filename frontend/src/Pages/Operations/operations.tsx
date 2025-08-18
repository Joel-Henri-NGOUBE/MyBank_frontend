import Header from "../../Components/Header/header";
import Operation from "../../Components/Operations/operation";
import Tablist from "../../Components/TabList/tablist";
import type { IOperation } from "../../Interfaces/operation";
import "./operations.css"
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { categories } from "../../Interfaces/categories";
import { useNavigate, type NavigateFunction } from "react-router";

export default function Operations(){

    const [operations, setOperations] = useState<IOperation[]>([])

    const [operationsDisplayed, setOperationsDisplayed] = useState<IOperation[]>([])

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
        : navigate("/")
    }, [])

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

    const allSlides: string[] = ["slideFromIncomesToAll","slideFromExpensesToAll","slideFromCategoriesToAll","slideFromAllToIncomes","slideFromExpensesToIncomes","slideFromCategoriesToIncomes","slideFromIncomesToExpenses","slideFromAllToExpenses","slideFromCategoriesToExpenses","slideFromIncomesToCategories","slideFromExpensesToCategories","slideFromAllToCategories"]

    function slideToAll(){
        
        if((document.querySelector(".clicked") as HTMLElement).classList.contains("incomes")){
            allSlides.forEach(aS => {
                (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
            });
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromIncomesToAll");
            
        }
        if((document.querySelector(".clicked") as HTMLElement).classList.contains("expenses")){
            allSlides.forEach(aS => {
                (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
            });
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromExpensesToAll");
            
        }
        if((document.querySelector(".clicked") as HTMLElement).classList.contains("categories")){
            allSlides.forEach(aS => {
                (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
            });
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromCategoriesToAll");

        }
        (document.querySelector(".clicked") as HTMLElement).classList.remove("clicked");
        (document.querySelector("span.all") as HTMLElement).classList.add("clicked");
        
    }

    function slideToIncomes(){
        if((document.querySelector(".clicked") as HTMLElement).classList.contains("all")){
            allSlides.forEach(aS => {
                (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
            });
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromAllToIncomes");
 
        }
        if((document.querySelector(".clicked") as HTMLElement).classList.contains("expenses")){
            allSlides.forEach(aS => {
                (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
            });
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromExpensesToIncomes");

        }
        if((document.querySelector(".clicked") as HTMLElement).classList.contains("categories")){
            allSlides.forEach(aS => {
                (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
            });
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromCategoriesToIncomes");
  
        }
        (document.querySelector(".clicked") as HTMLElement).classList.remove("clicked");
        (document.querySelector("span.incomes") as HTMLElement).classList.add("clicked");
    }

    function slideToExpenses(){

        if((document.querySelector(".clicked") as HTMLElement).classList.contains("incomes")){
            allSlides.forEach(aS => {
                (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
            });
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromIncomesToExpenses");
        }
        if((document.querySelector(".clicked") as HTMLElement).classList.contains("all")){
            allSlides.forEach(aS => {
                (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
            });
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromAllToExpenses");
        }
        if((document.querySelector(".clicked") as HTMLElement).classList.contains("categories")){
            allSlides.forEach(aS => {
                (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
            });
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromCategoriesToExpenses");
        }
        (document.querySelector(".clicked") as HTMLElement).classList.remove("clicked");
        (document.querySelector("span.expenses") as HTMLElement).classList.add("clicked");

    }

    function slideToCategories(){

        if((document.querySelector(".clicked") as HTMLElement).classList.contains("incomes")){
            allSlides.forEach(aS => {
                (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
            });
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromIncomesToCategories");
        }
        if((document.querySelector(".clicked") as HTMLElement).classList.contains("expenses")){
            allSlides.forEach(aS => {
                (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
            });
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromExpensesToCategories");
        }
        if((document.querySelector(".clicked") as HTMLElement).classList.contains("all")){
            allSlides.forEach(aS => {
                (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
            });
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromAllToCategories");
        }
        (document.querySelector(".clicked") as HTMLElement).classList.remove("clicked");
        (document.querySelector("span.categories") as HTMLElement).classList.add("clicked");

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