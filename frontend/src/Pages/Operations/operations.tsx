import { useLocation, useNavigate, type NavigateFunction } from "react-router";
import Header from "../../Components/Header/header";
import Operation from "../../Components/Operations/operation";
import Tablist from "../../Components/TabList/tablist";
import type { IOperation } from "../../Interfaces/operation";
import "./operations.css"
import { useEffect, useState } from "react";
import type { ILoginSuccess } from "../../Interfaces/APIResponses";
import { jwtDecode } from "jwt-decode";
import { categories } from "../../Interfaces/categories";
import { getNavigationStatusParameters } from "../Utils/getNavigationStateParameters";
import { useId } from "../Utils/useId";

export default function Operations(){

    const [operations, setOperations] = useState<IOperation[]>([])

    const [operationsDisplayed, setOperationsDisplayed] = useState<IOperation[]>([])

    // const categories = ["salary", "courses", "payment", "tax", "subscription"]

    const [navigate, token] = getNavigationStatusParameters()

    const [id, setId] = useId(token, navigate)

    console.log(token)

    useEffect(() => {
        const localToken = localStorage.getItem("token")
        if(!token && localToken){
            fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/id"].join(""), {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localToken}`
                        },
                        body: JSON.stringify({
                            email: (jwtDecode(localToken) as any).username
                        })
                    })
            .then(res => {
                (!res.status.toString().startsWith("2")) && navigate("/");
                return res.json()
            })
            .then((res: {id: number}) => setId(res.id))
            console.log(1)
        }
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
            console.log(res.member)
            setOperations(res.member)
            setOperationsDisplayed(res.member)
        })
        console.log(2, id)
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
        
        // console.dir(
            // Array.from(
        if((document.querySelector(".clicked") as HTMLElement).classList.contains("incomes")){
            allSlides.forEach(aS => {
                (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
            });
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromIncomesToAll");
            // (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove("slideFromExpensesToAll");
            // (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove("slideFromCategoriesToAll");

        }
        if((document.querySelector(".clicked") as HTMLElement).classList.contains("expenses")){
            allSlides.forEach(aS => {
                (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
            });
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromExpensesToAll");
            // (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove("slideFromIncomesToAll");
            // (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove("slideFromCategoriesToAll");

        }
        if((document.querySelector(".clicked") as HTMLElement).classList.contains("categories")){
            allSlides.forEach(aS => {
                (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
            });
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromCategoriesToAll");
            // (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove("slideFromIncomesToAll");
            // (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove("slideFromExpensesToAll");

        }
        (document.querySelector(".clicked") as HTMLElement).classList.remove("clicked");
        (document.querySelector("span.all") as HTMLElement).classList.add("clicked");
            // )
        // )
            // (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slide");

            // (document.querySelector(".tablist .tab:nth-of-type(1)") as HTMLElement).classList.remove("clicked");
            // (document.querySelector(".tablist .tab:nth-of-type(2)") as HTMLElement).classList.add("clicked")
            // if((document.querySelector(".operations-wrapper") as HTMLElement).classList.contains("slide-back")){
            //     (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove("slide-back");

            // // (document.querySelector(".tablist .tab:nth-of-type(1)") as HTMLElement).classList.add("clicked");
            // // (document.querySelector(".tablist .tab:nth-of-type(2)") as HTMLElement).classList.remove("clicked")
            // }
            // console.log("Slide added")
        // }
    }

    function slideToIncomes(){
        if((document.querySelector(".clicked") as HTMLElement).classList.contains("all")){
            allSlides.forEach(aS => {
                (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
            });
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromAllToIncomes");
            // (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove("slideFromExpensesToIncomes");
            // (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove("slideFromCategoriesToIncomes");

        }
        if((document.querySelector(".clicked") as HTMLElement).classList.contains("expenses")){
            allSlides.forEach(aS => {
                (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
            });
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromExpensesToIncomes");
            // (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove("slideFromAllToIncomes");
            // (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove("slideFromCategoriesToIncomes");

        }
        if((document.querySelector(".clicked") as HTMLElement).classList.contains("categories")){
            allSlides.forEach(aS => {
                (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove(aS);
            });
            (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slideFromCategoriesToIncomes");
            // (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove("slideFromAllToIncomes");
            // (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove("slideFromExpensesToIncomes");

        }
        (document.querySelector(".clicked") as HTMLElement).classList.remove("clicked");
        (document.querySelector("span.incomes") as HTMLElement).classList.add("clicked");
        // if(!(document.querySelector(".operations-wrapper") as HTMLElement).classList.contains("slide-back")){
        //     (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slide-back");

        //     (document.querySelector(".tablist .tab:nth-of-type(1)") as HTMLElement).classList.add("clicked");
        //     (document.querySelector(".tablist .tab:nth-of-type(2)") as HTMLElement).classList.remove("clicked")

        //     if((document.querySelector(".operations-wrapper") as HTMLElement).classList.contains("slide")){
        //         (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove("slide");

        //     // (document.querySelector(".tablist .tab:nth-of-type(1)") as HTMLElement).classList.add("clicked");
        //     // (document.querySelector(".tablist .tab:nth-of-type(2)") as HTMLElement).classList.remove("clicked")
        //     }
        //     console.log("Slide Back added")
        // }
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

        // if(!(document.querySelector(".operations-wrapper")as HTMLElement).classList.contains("slide")){
        //     (document.querySelector(".operations-wrapper") as HTMLElement).classList.add("slide");

        //     (document.querySelector(".tablist .tab:nth-of-type(1)") as HTMLElement).classList.remove("clicked");
        //     (document.querySelector(".tablist .tab:nth-of-type(2)") as HTMLElement).classList.add("clicked")
        //     if((document.querySelector(".operations-wrapper") as HTMLElement).classList.contains("slide-back")){
        //         (document.querySelector(".operations-wrapper") as HTMLElement).classList.remove("slide-back");

        //     // (document.querySelector(".tablist .tab:nth-of-type(1)") as HTMLElement).classList.add("clicked");
        //     // (document.querySelector(".tablist .tab:nth-of-type(2)") as HTMLElement).classList.remove("clicked")
        //     }
        //     console.log("Slide added")
        // }
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

        // if(!(document.querySelector(".slider") as HTMLElement).classList.contains("slide-back")){
        //     (document.querySelector(".slider") as HTMLElement).classList.add("slide-back");

        //     (document.querySelector(".tablist .tab:nth-of-type(1)") as HTMLElement).classList.add("clicked");
        //     (document.querySelector(".tablist .tab:nth-of-type(2)") as HTMLElement).classList.remove("clicked")

        //     if((document.querySelector(".slider") as HTMLElement).classList.contains("slide")){
        //         (document.querySelector(".slider") as HTMLElement).classList.remove("slide");

        //     // (document.querySelector(".tablist .tab:nth-of-type(1)") as HTMLElement).classList.add("clicked");
        //     // (document.querySelector(".tablist .tab:nth-of-type(2)") as HTMLElement).classList.remove("clicked")
        //     }
        //     console.log("Slide Back added")
        // }
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
                                    token={token}
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
                                    token={token}
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
                                    token={token}
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
                                        token={token}
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
                <button onClick={() => navigate("/neworsetoperation", {state: {token: token}})}>Add new operation</button>
                <button onClick={() => navigate("/statistics", {state: {token: token}})}>Access statistics</button>
            </div>
        </div>
        </div>
}