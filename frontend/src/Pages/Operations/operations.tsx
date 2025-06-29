import { useNavigate } from "react-router";
import Header from "../../Components/Header/header";
import Operation from "../../Components/Operations/operation";
import Tablist from "../../Components/TabList/tablist";
import type { IOperation } from "../../Interfaces/operation";
import "./operations.css"
import { useState } from "react";

export default function Operations(){

    const operations: IOperation[] = [
        {label: "VIREMENT RECU DE: AIRBUS FRANCE SAS\nREF:FR2025:48:456355:34334:34", category: "salary", type: "income", amount: 1750, date: "29/05/2025"},
        {label: "PAIEMENT CARTE J85475\nREF:FR2025:48:456355:34334:34", category: "courses", type: "expense", amount: 150.67, date: "29/05/2025"},
        {label: "VIREMENT RECU DE: AIRBUS FRANCE SAS\nREF:FR2025:48:456355:34334:34", category: "payment", type: "income", amount: 170.98, date: "29/05/2025"},
        {label: "PRELEVEMENT IMPÔT\nREF:FR2025:48:456355:34334:34", category: "tax", type: "expense", amount: 15.17, date: "29/05/2025"},
        {label: "PRELEVEMENT SEPA ABONNEMENT\nREF:FR2025:48:456355:34334:34", category: "subscription", type: "expense", amount: 130.56, date: "29/05/2025"},
    ]

    const [operationsDisplayed, setOperationsDisplayed] = useState<IOperation[]>(operations)

    const categories = ["salary", "courses", "payment", "tax", "subscription"]

    // const result = Object.
    // console.log(operations.groupBy()

    const navigate : Function = useNavigate()
    

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
                style={operations.reduce((acc, cur) => cur.type === "income" ? acc + cur.amount : acc - cur.amount, 0) < 0 ? {color: "var(--negative-red)"} : {color: ""}}> 
                    {operations.reduce((acc, cur) => cur.type === "income" ? acc + cur.amount : acc - cur.amount, 0)} €
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
                                    key={index}
                                />
                            )}
                        </div>

                        <div className="incomes">
                            {operations.filter(op => op.type === "income").map((op, index) => 
                                <Operation 
                                    operation={op}
                                    key={index}
                                />
                            )}
                        </div>

                        <div className="expenses">
                            {operations.filter(op => op.type === "expense").map((op, index) => 
                                <Operation 
                                    operation={op}
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